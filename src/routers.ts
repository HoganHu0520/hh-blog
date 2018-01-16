import { Routes } from '@angular/router';

import { LoginPageComponent } from './login/containers/login-page.component';

let routers: Routes = [];
export default routers = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
