import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppService } from './app.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
