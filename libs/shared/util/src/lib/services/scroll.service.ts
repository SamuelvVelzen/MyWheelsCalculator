import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { WINDOW } from '../injectiontokens/window';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private readonly _defaultOptions: ScrollIntoViewOptions = {
    behavior: 'smooth',
  };

  private readonly _window = inject(WINDOW);
  private readonly _document = inject(DOCUMENT);

  scrollTo(element: HTMLElement) {
    element.scrollIntoView(this._defaultOptions);
  }

  scrollToTop() {
    this._window.scrollTo({ ...this._defaultOptions, top: 0 });
  }

  scrollToBottom() {
    this._window.scrollTo({
      ...this._defaultOptions,
      top: this._document.body.scrollHeight,
    });
  }
}
