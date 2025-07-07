import {
  computed,
  inject,
  Injectable,
  linkedSignal,
  signal,
} from '@angular/core';
import { AbonnementOptionsEnum } from '../_types/AbonnementOptionsEnum';
import { AutoOptions, AutoOptionsEnum } from '../_types/AutoOptionsEnum';
import { TripOptions, TripOptionsEnum } from '../_types/TripOptionsEnum';
import { PeriodService } from './period.service';
import { PriceService } from './price.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private readonly _periodService = inject(PeriodService);

  abonnement = signal<AbonnementOptionsEnum>(AbonnementOptionsEnum.Start);
  car = signal<AutoOptionsEnum>(AutoOptionsEnum.Comfort);

  kilometers = signal<number>(1);
  startDate = this._periodService.startDate;
  endDate = this._periodService.endDate;

  hasStartPrice = computed(() =>
    this.calculateHasStartPrice(this.abonnement(), this.trip())
  );
  hasDepositPaid = signal<boolean>(false);

  trip = linkedSignal(() =>
    this.getClosedTrip(this.kilometers(), this.abonnement(), this.car())
  );

  calculateHasStartPrice(
    abonnement: AbonnementOptionsEnum,
    trip: TripOptionsEnum
  ): boolean {
    return (
      abonnement === AbonnementOptionsEnum.Start &&
      trip === TripOptionsEnum.None
    );
  }

  getClosedTrip(
    kilometers: number,
    abonnement: AbonnementOptionsEnum,
    car: AutoOptionsEnum
  ): TripOptionsEnum {
    const kmPrice = AutoOptions[abonnement][car].kmPrice;
    const defaultTotalKmPrice = kmPrice * kilometers;

    // Remove start price if abonnement is start
    // because start price is removed when someone chooses trip higher than None
    const hasStartPrice = abonnement === AbonnementOptionsEnum.Start;
    const startPriceDeduction = hasStartPrice ? PriceService.startPrice : 0;

    const tripOptions = Object.entries(TripOptions)
      .filter(([index]) => index !== TripOptionsEnum.None)
      .map(([index, trip]) => ({
        option: index as TripOptionsEnum,
        freeKm: trip.freeKm,
        price: trip.price,
      }))
      .sort((a, b) => a.freeKm - b.freeKm);

    let cheapestTrip = TripOptionsEnum.None;
    let cheapestPrice = defaultTotalKmPrice;

    for (let i = 0; i < tripOptions.length; i++) {
      const { option, freeKm, price } = tripOptions[i];

      // Early termination: if base price (after start price deduction) is already
      // higher than our current cheapest total price, we can stop
      // This works because all subsequent options have even higher base prices
      const adjustedBasePrice = Math.max(0, price - startPriceDeduction);
      if (adjustedBasePrice >= cheapestPrice) {
        break;
      }

      const extraKm = Math.max(0, kilometers - freeKm);
      const extraKmPrice = extraKm * kmPrice;
      const totalTripPrice = adjustedBasePrice + extraKmPrice;

      if (totalTripPrice < cheapestPrice) {
        cheapestPrice = totalTripPrice;
        cheapestTrip = option;
      }
    }

    return cheapestTrip;
  }
}
