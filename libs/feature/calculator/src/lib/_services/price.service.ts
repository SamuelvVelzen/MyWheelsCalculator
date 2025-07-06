import { inject, Injectable, signal } from '@angular/core';
import {
  AbonnementOptions,
  AbonnementOptionsEnum,
} from '../_types/AbonnementOptionsEnum';
import { AutoOptions, AutoOptionsEnum } from '../_types/AutoOptionsEnum';
import { TripOptions, TripOptionsEnum } from '../_types/TripOptionsEnum';
import { PeriodService } from './period.service';

export type IPriceDetail = {
  totalPrice: number;
  basePrice: number;
  extraCosts: number;
  kmTotalCost: number;
  extraKm: number;
  extraKmTotalCost: number;
  hourPrice: number;
  depositPrice: number;
};

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
    startDate,
    endDate,
  }: {
    abonnement: AbonnementOptionsEnum;
    trip: TripOptionsEnum;
    car: AutoOptionsEnum;
    kilometers: number;
    hasStartPrice: boolean;
    hasDepositPaid: boolean;
    startDate: Date;
    endDate: Date;
  }): IPriceDetail {
    const totalPeriodTime = this._periodService.getTotalPeriodTime(
      startDate,
      endDate
    );

    const kmPrice = this.autoOptions[AbonnementOptionsEnum.Start][car].kmPrice;

    const hourPrice = this._hourPrice(car, totalPeriodTime);
    const kmTotalCost = this._kilometerPrice(trip, car, kilometers);
    const extraKm = this._extraKm(trip, kilometers);
    const extraKmTotalCost = extraKm * kmPrice;

    const depositPrice = this._getDepositPrice(startDate, endDate);

    const extraCosts = this._extraCosts(
      hasStartPrice,
      hasDepositPaid,
      depositPrice
    );

    const basePrice = this._basePrice(hourPrice, kmTotalCost, extraCosts);

    return {
      totalPrice: this._totalPrice(abonnement, basePrice),
      basePrice,
      extraCosts,
      kmTotalCost,
      extraKm,
      extraKmTotalCost,
      hourPrice,
      depositPrice,
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

  private _extraCosts(
    hasStartPrice: boolean,
    hasDepositPaid: boolean,
    depositPrice: number
  ): number {
    let extraCosts = 0;

    if (hasStartPrice) {
      extraCosts += PriceService.startPrice;
    }

    if (!hasDepositPaid) {
      extraCosts += depositPrice;
    }

    return extraCosts;
  }

  private _getDepositPrice(startDate: Date, endDate: Date): number {
    const totalDepositDays = this._periodService.getTotalDepositDays(
      startDate,
      endDate
    );
    return totalDepositDays * PriceService.depositPrice;
  }

  private _kilometerPrice(
    trip: TripOptionsEnum,

    car: AutoOptionsEnum,
    kilometers: number
  ): number {
    const { price: tripPrice } = this.tripOptions[trip];
    const kmPrice = this.autoOptions[AbonnementOptionsEnum.Start][car].kmPrice;

    const extraKmPrice = this._extraKm(trip, kilometers) * kmPrice;

    return extraKmPrice + tripPrice;
  }

  private _hourPrice(car: AutoOptionsEnum, totalPeriodTime: number): number {
    return (
      this.autoOptions[AbonnementOptionsEnum.Start][car].hourPrice *
      totalPeriodTime
    );
  }

  private _extraKm(trip: TripOptionsEnum, kilometers: number): number {
    const { freeKm } = this.tripOptions[trip];

    return Math.max(0, kilometers - freeKm);
  }
}
