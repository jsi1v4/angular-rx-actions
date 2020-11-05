import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, concatMap, catchError, shareReplay } from 'rxjs/operators';

export interface Wrapper<T> {
  payload: T | undefined;
  loading: boolean;
  error: string;
  pristine: boolean;
  valid: boolean;
}

export interface Error {
  status: number;
  message: string;
}

const wrapper = (
  payload, loading = false, error = '', pristine = true, valid = false
) => ({
  payload, loading, error, pristine, valid
});

export class Action<T> {
  private source: BehaviorSubject<Wrapper<T>>;

  constructor(initialValue?: T) {
    this.source = new BehaviorSubject(wrapper(initialValue));
  }

  get value() {
    return this.source.value;
  }
  get $() {
    return this.source.asObservable();
  }

  public exec(
    request: Observable<T | undefined>,
    onSuccess = (res: T) => { },
    onError = (err: Error) => { },
    mutation = (res: T) => {
      return res;
    }
  ) {
    this.source.next(wrapper(undefined, true, '', false));
    request
      .pipe(
        first(),
        concatMap((res: T) => {
          onSuccess(res);
          const result = mutation(res);
          return of(wrapper(result, false, '', false, true));
        }),
        catchError((err: Error) => {
          onError(err);
          return of(wrapper(undefined, false, err.message, false));
        }),
        shareReplay(1)
      )
      .subscribe((result) => this.source.next(result));
  }

  public reset() {
    this.source.next(wrapper(undefined));
  }
}
