import { BehaviorSubject } from 'rxjs';

export class State<T> {
  private source: BehaviorSubject<T>;

  get value() {
    return this.source.value;
  }
  get $() {
    return this.source.asObservable();
  }

  constructor(initialValue: T) {
    this.source = new BehaviorSubject(initialValue);
  }

  setValue(value: T) {
    this.source.next(value);
  }
}
