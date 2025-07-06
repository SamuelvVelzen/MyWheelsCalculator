import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';

@Directive({
  selector: '[mwcTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input() mwcTooltip = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() tooltipTrigger: 'hover' | 'manual' = 'hover';

  ngOnInit(): void {
    // Set the data attribute for the tooltip content
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'data-tooltip',
      this.mwcTooltip
    );

    // Add position class
    this.renderer.addClass(
      this.elementRef.nativeElement,
      `mwc-tooltip-native-${this.tooltipPosition}`
    );

    // Add trigger class
    this.renderer.addClass(
      this.elementRef.nativeElement,
      `mwc-tooltip-trigger-${this.tooltipTrigger}`
    );
  }

  // Public methods for programmatic control
  show(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'mwc-tooltip-show');
  }

  hide(): void {
    this.renderer.removeClass(
      this.elementRef.nativeElement,
      'mwc-tooltip-show'
    );
  }

  showTemporary(duration = 2000): void {
    this.show();
    setTimeout(() => this.hide(), duration);
  }

  updateContent(content: string): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'data-tooltip',
      content
    );
  }
}
