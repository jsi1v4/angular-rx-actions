# Angular Rxjs Actions
Tool for angular projects or reactive applications with rxjs. 

## How to use

### Service
```
  const heroes: Hero[] = [
    { name: 'Peter', level: 25 },
    { name: 'Tony', level: 50 },
    { name: 'Stephen', level: 99 }
  ];

  getHeroes() {
    return of(heroes); // httpClient on Angular or from (rxjs/operators) for Promise
  }
```

### Component
```
  readonly request = new Action<Hero[]>();
  
  getHeroes() {
    this.request.exec(
      this.appService.getHeroes(), // Observable
      (response: Hero[]) => console.log('success', response),
      (error: Error) => console.log('error', error)
    );
  }
```

### Template
```
  <ng-container *ngIf="request.$ | async as data">
    <span *ngIf="data.loading">Loading...</span>
    <span *ngIf="data.error">Error! {{ data.error }}</span>
    ...
      <tr *ngFor="let row of data.payload">
        <td>{{ row.name }}</td>
        <td>{{ row.level }}</td>
      </tr>
    ...
  </ng-container>
```

## About
- **Author**: Jose Silva
- **Dep**: Rxjs(>6.x.x)
