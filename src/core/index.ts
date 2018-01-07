import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import MinHeightMode from './directives/min-height-mode';
import { BroadCaster } from './services/BroadCaster';
import ArrayFilterPipe from './pipes/array-filter';

@NgModule({
  declarations: [MinHeightMode, ArrayFilterPipe],
  providers: [BroadCaster],
  exports: [MinHeightMode, ArrayFilterPipe],
  imports: [CommonModule],
})
export default class CoreModule {}
