import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';

import { Http, Response, HttpModule }  from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
// import * as fs from 'fs';
import * as Raven from 'raven-js';

import { ServService } from './service/serv.service';

import { ChatModule } from './chat/chat.module';
Raven
.config('https://ad566634df2b4b9ba348b15d5efdd664@sentry.io/253700')
.install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err);
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ChatModule
  ],
  providers: [ServService,{provide: ErrorHandler, useClass: RavenErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
