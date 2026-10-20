import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appHoverScale]'
})
export class HoverScaleDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'scale(1.02)'
    );

    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'transform 0.2s ease'
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'scale(1)'
    );
  }
}
