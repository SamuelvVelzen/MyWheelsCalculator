import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[mwcTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnInit {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  @Input() mwcTooltip = '';
  @Input() tooltipPosition: TooltipPosition | TooltipPosition[] = [
    'top',
    'bottom',
    'right',
    'left',
  ];
  @Input() tooltipTrigger: 'hover' | 'manual' = 'hover';

  private currentPosition: TooltipPosition = 'top';

  ngOnInit(): void {
    // Skip tooltip functionality during SSR
    if (!this.isBrowser) {
      return;
    }

    // Set the data attribute for the tooltip content
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'data-tooltip',
      this.mwcTooltip
    );

    // Calculate and set position
    this.updatePosition();

    // Add trigger class
    this.renderer.addClass(
      this.elementRef.nativeElement,
      `mwc-tooltip-trigger-${this.tooltipTrigger}`
    );
  }

  // Public methods for programmatic control
  show(): void {
    // Skip during SSR
    if (!this.isBrowser) {
      return;
    }

    // Recalculate position before showing if using multiple options
    if (Array.isArray(this.tooltipPosition)) {
      this.updatePosition();
    }
    this.renderer.addClass(this.elementRef.nativeElement, 'mwc-tooltip-show');
  }

  hide(): void {
    // Skip during SSR
    if (!this.isBrowser) {
      return;
    }

    this.renderer.removeClass(
      this.elementRef.nativeElement,
      'mwc-tooltip-show'
    );
  }

  showTemporary(duration = 2000): void {
    // Skip during SSR
    if (!this.isBrowser) {
      return;
    }

    this.show();
    setTimeout(() => this.hide(), duration);
  }

  updateContent(content: string): void {
    // Skip during SSR
    if (!this.isBrowser) {
      return;
    }

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'data-tooltip',
      content
    );
  }

  private updatePosition(): void {
    // Skip during SSR
    if (!this.isBrowser) {
      return;
    }

    // Remove previous position classes
    ['top', 'bottom', 'left', 'right'].forEach((pos) => {
      this.renderer.removeClass(
        this.elementRef.nativeElement,
        `mwc-tooltip-${pos}`
      );
    });

    // Calculate best position from allowed options
    if (Array.isArray(this.tooltipPosition)) {
      this.currentPosition = this.findBestPosition(this.tooltipPosition);
    } else {
      this.currentPosition = this.tooltipPosition;
    }

    // Add new position class
    this.renderer.addClass(
      this.elementRef.nativeElement,
      `mwc-tooltip-${this.currentPosition}`
    );
  }

  private findBestPosition(
    allowedPositions: TooltipPosition[]
  ): TooltipPosition {
    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const tooltipWidth = Math.min(300, this.mwcTooltip.length * 8 + 24);
    const tooltipHeight = 40;
    const margin = 8;

    // Calculate available space in each direction
    const spaces = {
      top: rect.top - margin,
      bottom: viewport.height - rect.bottom - margin,
      left: rect.left - margin,
      right: viewport.width - rect.right - margin,
    };

    const fits = {
      top:
        spaces.top >= tooltipHeight &&
        this.hasHorizontalSpace(rect, tooltipWidth, viewport, margin),
      bottom:
        spaces.bottom >= tooltipHeight &&
        this.hasHorizontalSpace(rect, tooltipWidth, viewport, margin),
      left:
        spaces.left >= tooltipWidth &&
        this.hasVerticalSpace(rect, tooltipHeight, viewport, margin),
      right:
        spaces.right >= tooltipWidth &&
        this.hasVerticalSpace(rect, tooltipHeight, viewport, margin),
    };

    // Find the first position from the allowed list that fits
    for (const position of allowedPositions) {
      if (fits[position]) {
        return position;
      }
    }

    // If none fit perfectly, prioritize user's preferred order
    // Find the first allowed position that has reasonable space
    for (const position of allowedPositions) {
      const minRequiredSpace =
        position === 'left' || position === 'right'
          ? tooltipWidth * 0.7 // Allow 70% of tooltip width
          : tooltipHeight * 0.7; // Allow 70% of tooltip height

      if (spaces[position] >= minRequiredSpace) {
        return position;
      }
    }

    return allowedPositions[0];
  }

  private hasHorizontalSpace(
    elementRect: DOMRect,
    tooltipWidth: number,
    viewport: { width: number },
    margin = 8
  ): boolean {
    const elementCenter = elementRect.left + elementRect.width / 2;
    const tooltipLeft = elementCenter - tooltipWidth / 2;
    const tooltipRight = elementCenter + tooltipWidth / 2;

    return tooltipLeft >= -margin && tooltipRight <= viewport.width + margin;
  }

  private hasVerticalSpace(
    elementRect: DOMRect,
    tooltipHeight: number,
    viewport: { height: number },
    margin = 8
  ): boolean {
    const elementCenter = elementRect.top + elementRect.height / 2;
    const tooltipTop = elementCenter - tooltipHeight / 2;
    const tooltipBottom = elementCenter + tooltipHeight / 2;

    // More lenient: allow tooltip to go slightly outside viewport but keep readable
    return tooltipTop >= -margin && tooltipBottom <= viewport.height + margin;
  }
}
