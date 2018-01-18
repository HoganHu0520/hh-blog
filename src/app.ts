import { Component, HostBinding } from '@angular/core';
import { PlatformLocation, LocationStrategy }from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'body',
  providers: [
    Title
  ],
  template: `
    <div class="router-container">
      <router-outlet></router-outlet>
    </div>
   `,
  styleUrls: ['app.scss']
})
export class AppCompnent {
  @HostBinding('class') public cssClass = '';
  @HostBinding('attr.size') size = '';

  // @select(['self', 'value'])
  readonly name: Observable<string>;

  private router: Router;
  private activateRoute: ActivatedRoute;

  constructor(
    private platformLocation: PlatformLocation,
    private locationStrategy: LocationStrategy,
    private cookieService: CookieService,
    router: Router,
    activateRoute: ActivatedRoute,
  ) {
    let rootParam = this.parseQueryString();
    this.router = router;
    this.activateRoute = activateRoute;
  }

  /**
   * get parameter from location when first time load app.
   */
  parseQueryString() {
    var str = window.location.search;
    var objURL = {};

    str.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      ($0, $1, $2, $3) => objURL[$1] = $3.replace(/%20/g, " ")
    );
    console.log('get params from location success');
    console.log(objURL);
    return objURL;
  };
}

