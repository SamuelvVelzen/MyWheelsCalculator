import { computed, inject, Injectable, signal } from '@angular/core';
import { AbonnementOptionsEnum } from '../_types/AbonnementOptionsEnum';
import { AutoOptionsEnum } from '../_types/AutoOptionsEnum';
import { TripOptionsEnum } from '../_types/TripOptionsEnum';
import { PeriodService } from './period.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private readonly _periodService = inject(PeriodService);

  abonnement = signal<AbonnementOptionsEnum>(AbonnementOptionsEnum.Start);
  car = signal<AutoOptionsEnum>(AutoOptionsEnum.Comfort);
  trip = signal<TripOptionsEnum>(TripOptionsEnum.None);
  kilometers = signal<number>(1);
  startDate = this._periodService.startDate;
  endDate = this._periodService.endDate;

  hasStartPrice = computed(
    () =>
      this.abonnement() === AbonnementOptionsEnum.Start &&
      this.trip() === TripOptionsEnum.None
  );
  hasDepositPaid = signal<boolean>(false);
}
