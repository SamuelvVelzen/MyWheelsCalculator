import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  OnInit,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseInputControls } from '../../_types/BaseInputControls';

@Component({
  selector: 'mwc-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class SliderComponent
  extends BaseInputControls<number>
  implements OnInit
{
  private readonly _injection = inject(Injector);

  rangeElement = viewChild.required<ElementRef<HTMLInputElement>>('range');

  ngOnInit(): void {
    effect(
      () => {
        const value = this.valueSignal();

        if (value) {
          this._setProgress(value);
        }
      },
      { injector: this._injection }
    );
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);

    this._setProgress(value);
  }

  private _setProgress(value: number) {
    const progress =
      (value / Number(this.rangeElement().nativeElement.max)) * 100;

    this.rangeElement().nativeElement.style.setProperty(
      '--progress',
      `${progress}%`
    );
  }
}
