import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './reducers';
import { AppCompnent } from './app';
import Routers from './routers';
import { ServiceLocator } from './utils/ServiceLocator';
import { APP_CONFIG } from './types';

import CoreModule from './core';
import { AuthModule } from './login/auth.module';

import './styles/common.g.scss';

// config object
let config = require('config/config.dev.json');

if (process.env.ENV === 'production') {
  config = require('config/config.production.json');
} else if (process.env.ENV === 'staging') {
  config = require('config/config.staging.json');
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(Routers),
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    AuthModule.forRoot(),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_CONFIG, useValue: config },
    CookieService,
  ],
  declarations: [
    AppCompnent,
  ],
  entryComponents: [],
  bootstrap: [AppCompnent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}

platformBrowserDynamic().bootstrapModule(AppModule);
