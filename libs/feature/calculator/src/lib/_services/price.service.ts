import { computed, inject, Injectable, signal } from '@angular/core';
import {
  AbonnementOptions,
  AbonnementOptionsEnum,
} from '../_types/AbonnementOptionsEnum';
import { AutoOptions, AutoOptionsEnum } from '../_types/AutoOptionsEnum';
import { TripOptions, TripOptionsEnum } from '../_types/TripOptionsEnum';
import { PeriodService } from './period.service';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  static readonly startPrice = 1.5;
  static readonly depositPrice = 4.99;

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

  private abonnementOptions = AbonnementOptions;
  private autoOptions = AutoOptions;
  private tripOptions = TripOptions;

  totalPrice = computed(() => {
    const discount = this.abonnementOptions[this.abonnement()].discount;

    return (this.basePrice() * (100 - discount)) / 100;
  });

  basePrice = computed(() => {
    const extraCosts = this.extraCosts();
    const kilometerPrice = this.kilometerPrice();
    const hourPrice = this.hourPrice();

    return extraCosts + kilometerPrice + hourPrice;
  });

  extraCosts = computed(() => {
    let extraCosts = 0;

    if (this.hasStartPrice()) {
      extraCosts += PriceService.startPrice;
    }

    if (!this.hasDepositPaid()) {
      extraCosts += this.depositPrice();
    }

    return extraCosts;
  });

  depositPrice = computed(() => {
    return this.totalDepositDays() * PriceService.depositPrice;
  });

  totalDepositDays = computed(() => {
    const billableHours = this._periodService.totalPeriodTime();
    return Math.ceil(billableHours / PeriodService.maxHoursInDay);
  });

  kilometerPrice = computed(() => {
    const { price: tripPrice } = this.tripOptions[this.trip()];
    const kmPrice = this.autoOptions[this.abonnement()][this.car()].kmPrice;

    const extraKmPrice = this.extraKm() * kmPrice;

    return extraKmPrice + tripPrice;
  });

  hourPrice = computed(() => {
    const totalPeriodTime = this._periodService.totalPeriodTime();

    return (
      this.autoOptions[this.abonnement()][this.car()].hourPrice *
      totalPeriodTime
    );
  });

  extraKm = computed(() => {
    const { freeKm } = this.tripOptions[this.trip()];

    const kilometers = this.kilometers();

    return Math.max(0, kilometers - freeKm);
  });
}
