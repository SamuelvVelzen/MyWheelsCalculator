import { computed, Injectable, signal } from '@angular/core';
import {
  AbonnementOptions,
  AbonnementOptionsEnum,
} from '../_types/AbonnementOptionsEnum';
import { AutoOptions, AutoOptionsEnum } from '../_types/AutoOptionsEnum';
import { TripOptions, TripOptionsEnum } from '../_types/TripOptionsEnum';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  static readonly startPrice = 1.5;
  static readonly depositPrice = 4.0;

  abonnement = signal<AbonnementOptionsEnum>(AbonnementOptionsEnum.Start);
  car = signal<AutoOptionsEnum>(AutoOptionsEnum.Comfort);
  trip = signal<TripOptionsEnum>(TripOptionsEnum.None);
  hours = signal<number>(1);
  kilometers = signal<number>(1);

  hasStartPrice = computed(
    () => this.abonnement() === AbonnementOptionsEnum.Start
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
      extraCosts += PriceService.depositPrice;
    }

    return extraCosts;
  });

  kilometerPrice = computed(() => {
    const { freeKm, price: tripPrice } = this.tripOptions[this.trip()];
    const kmPrice = this.autoOptions[this.abonnement()][this.car()].kmPrice;

    const kilometers = this.kilometers();

    const extraKm = Math.max(0, kilometers - freeKm);
    const extraKmPrice = extraKm * kmPrice;

    return extraKmPrice + tripPrice;
  });

  hourPrice = computed(() => {
    return (
      this.autoOptions[this.abonnement()][this.car()].hourPrice * this.hours()
    );
  });
}
