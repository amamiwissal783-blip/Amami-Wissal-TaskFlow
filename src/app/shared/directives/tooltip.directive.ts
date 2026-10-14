import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  @Input() appTooltip = '';

  private tooltipElement?: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {

    this.renderer.addClass(
      this.el.nativeElement,
      'relative'
    );
  }


  @HostListener('mouseenter')
  showTooltip(): void {

    if (!this.appTooltip) {
      return;
    }

    const span = this.renderer.createElement('span');

    const text = this.renderer.createText(
      this.appTooltip
    );

    this.renderer.appendChild(span, text);

    this.renderer.addClass(span, 'absolute');
    this.renderer.addClass(span, 'left-0');
    this.renderer.addClass(span, 'top-full');
    this.renderer.addClass(span, 'mt-1');
    this.renderer.addClass(span, 'bg-gray-800');
    this.renderer.addClass(span, 'text-white');
    this.renderer.addClass(span, 'text-sm');
    this.renderer.addClass(span, 'px-2');
    this.renderer.addClass(span, 'py-1');
    this.renderer.addClass(span, 'rounded');
    this.renderer.addClass(span, 'z-50');

    this.renderer.appendChild(
      this.el.nativeElement,
      span
    );

    this.tooltipElement = span;
  }


  @HostListener('mouseleave')
  hideTooltip(): void {

    if (!this.tooltipElement) {
      return;
    }

    this.renderer.removeChild(
      this.el.nativeElement,
      this.tooltipElement
    );

    this.tooltipElement = undefined;
  }
}
