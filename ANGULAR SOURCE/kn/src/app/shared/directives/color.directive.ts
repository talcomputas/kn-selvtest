import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({ selector: '[app-color]' })
export class ColorDirective implements OnChanges {
  @Input('app-color')
  color: 'primary' | 'secondary' | 'accent' | 'warn';

  private el: HTMLElement;

  constructor(elRef: ElementRef) {
    this.el = elRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { color } = changes;

    if (color) {
      const { previousValue, currentValue } = color;
      this.el.classList.remove(previousValue);
      this.el.classList.add(currentValue);
    }
  }
}
