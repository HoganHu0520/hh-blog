import { Directive, HostListener, Input } from '@angular/core';

const Modes = {
  WithoutFooter: 'without-footer',
  WithFooter: 'with-footer'
};

@Directive({
  selector: '[min-height-mode]',
  host: {
    '[style.min-height]': 'minHeight'
  }
})
export default class MinHeightMode {
  @Input('min-height-mode') mode: string;

  _minHeight = 1;
  constructor() {
    this._minHeight = getMinHeight(this.mode);
  }

  get minHeight() {
    return `${this._minHeight}px`;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this._minHeight = getMinHeight(this.mode);
  }
}

function getMinHeight(mode: string): number {
  let footHeight = 2 * 16;
  let result = window.innerHeight;

  if (mode === Modes.WithFooter) {
    result -= footHeight; // Delete footer height
  }
  return result;
}
