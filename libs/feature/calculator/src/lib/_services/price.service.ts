import { inject, Injectable, signal } from '@angular/core';
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
  trip = signal<TripOptionsEnum>(TripOptionsEnum.None);
  kilometers = signal<number>(1);

  private abonnementOptions = AbonnementOptions;
  private autoOptions = AutoOptions;
  private tripOptions = TripOptions;

  calculatePrice({
    abonnement,
    trip,
    car,
    kilometers,
    hasStartPrice,
    hasDepositPaid,
  }: {
    abonnement: AbonnementOptionsEnum;
    trip: TripOptionsEnum;
    car: AutoOptionsEnum;
    kilometers: number;
    hasStartPrice: boolean;
    hasDepositPaid: boolean;
  }): {
    totalPrice: number;
    basePrice: number;
    extraCosts: number;
    kmPrice: number;
    extraKm: number;
    hourPrice: number;
    depositPrice: number;
  } {
    const hourPrice = this._hourPrice(abonnement, car);
    const kmPrice = this._kilometerPrice(trip, abonnement, car, kilometers);
    const extraCosts = this._extraCosts(hasStartPrice, hasDepositPaid);

    const basePrice = this._basePrice(hourPrice, kmPrice, extraCosts);

    return {
      totalPrice: this._totalPrice(abonnement, basePrice),
      basePrice,
      extraCosts,
      kmPrice,
      extraKm: this._extraKm(trip, kilometers),
      hourPrice,
      depositPrice: this._depositPrice(),
    };
  }

  private _totalPrice(
    abonnement: AbonnementOptionsEnum,
    basePrice: number
  ): number {
    const discount = this.abonnementOptions[abonnement].discount;

    return (basePrice * (100 - discount)) / 100;
  }

  private _basePrice(
    hourPrice: number,
    kilometerPrice: number,
    extraCosts: number
  ): number {
    return extraCosts + kilometerPrice + hourPrice;
  }

  private _extraCosts(hasStartPrice: boolean, hasDepositPaid: boolean): number {
    let extraCosts = 0;

    if (hasStartPrice) {
      extraCosts += PriceService.startPrice;
    }

    if (!hasDepositPaid) {
      extraCosts += this._depositPrice();
    }

    return extraCosts;
  }

  private _depositPrice(): number {
    return this._periodService.totalDepositDays() * PriceService.depositPrice;
  }

  private _kilometerPrice(
    trip: TripOptionsEnum,
    abonnement: AbonnementOptionsEnum,
    car: AutoOptionsEnum,
    kilometers: number
  ): number {
    const { price: tripPrice } = this.tripOptions[trip];
    const kmPrice = this.autoOptions[abonnement][car].kmPrice;

    const extraKmPrice = this._extraKm(trip, kilometers) * kmPrice;

    return extraKmPrice + tripPrice;
  }

  private _hourPrice(
    abonnement: AbonnementOptionsEnum,
    car: AutoOptionsEnum
  ): number {
    const totalPeriodTime = this._periodService.totalPeriodTime();

    return this.autoOptions[abonnement][car].hourPrice * totalPeriodTime;
  }

  private _extraKm(trip: TripOptionsEnum, kilometers: number): number {
    const { freeKm } = this.tripOptions[trip];

    return Math.max(0, kilometers - freeKm);
  }
}
