import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() appHighlight = '#fef9c3';

  private originalColor = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {

    this.originalColor =
      this.el.nativeElement.style.backgroundColor;

    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.appHighlight
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {

    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.originalColor
    );
  }
}
