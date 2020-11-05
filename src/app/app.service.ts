import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

export interface Hero {
  name: string;
  level: number;
}

const heroes: Hero[] = [
  { name: 'Peter', level: 25 },
  { name: 'Tony', level: 50 },
  { name: 'Stephen', level: 99 }
];

@Injectable()
export class AppService {

  constructor() { }

  getHeroes() {
    return of(heroes.slice(0, Math.floor(Math.random() * heroes.length)))
      .pipe(
        delay(3000)
      );
  }

  getVillains() {
    return of([])
      .pipe(
        delay(3000),
        switchMap(() => throwError({ message: 'You shall not pass...' }))
      );
  }
}
