import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Action } from 'src/tools/action';
import { State } from 'src/tools/state';
import { AppService, Hero } from './app.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Reactive Actions</h1>
    <div class="container">
      <ng-container *ngIf="request.$ | async as data">
        <p class="gap">
          <button (click)="getHeroes()">Heroes</button>
          <button (click)="getVillains()">Villains</button>
        </p>
        <span *ngIf="data.loading">Loading...</span>
        <span *ngIf="data.error">Error! {{ data.error }}</span>
        <h4 *ngIf="data.pristine">Click to show table of heroes.</h4>
        <ng-container *ngIf="data.payload">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of data.payload">
                <td>{{ row.name }}</td>
                <td>{{ row.level }}</td>
              </tr>
            </tbody>
          </table>
        </ng-container>
      </ng-container>
      <ng-container *ngIf="copy.$ | async as data">
        <h4 *ngIf="!!data.length">
          This is a copy of heroes [length = {{ data.length }}], but it can be used to store some state of application.
        </h4>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
      }

      .gap > * {
        margin: 0 .5rem .5rem;
      }

      h1, th, td {
        text-align: center;
      }

      th, td {
        padding: .5rem;
      }

      th {
        font-weight: bold;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly request = new Action<Hero[]>();
  readonly copy = new State<Hero[]>([]);

  constructor(private appService: AppService) { }

  getHeroes() {
    this.request.exec(
      this.appService.getHeroes(),
      (response) => {
        console.log('success', response);
        this.copy.setValue(response.slice());
      },
      (error) => console.log('error', error)
    );
  }

  getVillains() {
    this.request.exec(
      this.appService.getVillains(),
      (response) => console.log('success', response),
      (error) => console.log('error', error)
    );
  }
}
