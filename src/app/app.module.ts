import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { DcjsModule } from 'ng2-dcjs'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DcjsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
