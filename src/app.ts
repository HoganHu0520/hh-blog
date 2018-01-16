import { Component, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { PlatformLocation, LocationStrategy }from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
// import { select } from '@angular-redux/store.old';
import { Observable } from 'rxjs/Observable';

import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'body',
  providers: [
    Title
  ],
  template: `
    <div class="router-container" min-height-mode="without-footer">
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
  private screenWidth: number = 0;

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

    this.size = screenSize();
  }

  @HostListener('window:resize', ['$event'])
  /**
   * add class tag of screen size
   */
  onResize(event: any) {
    this.size = screenSize();
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

function screenSize() {
  const width = window.innerWidth;
  let classTag = '';
  if (width >= 90.063 * 16) {
    classTag = 'screen-xl';
  } else if (width >= 64.063 * 16) {
    classTag = 'screen-lg';
  } else if (width >= 40.063 * 16) {
    classTag = 'screen-md';
  } else {
    classTag = 'screen-sm'
  }
  return classTag;
}
