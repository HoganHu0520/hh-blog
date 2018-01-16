import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import CoreModule from '@/core';

import { LoginPageComponent } from './page';

@NgModule({
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent],
  imports: [FormsModule, CoreModule, CommonModule],
})
export class LoginPageModule {}
