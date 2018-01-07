import { Routes } from '@angular/router';

import { LoginPageComponent } from './pages/login/page';

let routers: Routes = [];
export default routers = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
