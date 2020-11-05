import { render } from '@testing-library/angular';

import { AppComponent } from './app.component';

test('AppComponent: should create', async () => {
  const { fixture } = await render(AppComponent);

  expect(fixture.componentInstance).toBeTruthy();
});
