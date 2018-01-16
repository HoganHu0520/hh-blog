import { Component, Input } from '@angular/core';

@Component({
  templateUrl: './page.html',
  styleUrls: [ './index.scss' ]
})
export class LoginPageComponent {
  @Input() username: string;
  @Input() password: string;

  constructor() {
  }
}
