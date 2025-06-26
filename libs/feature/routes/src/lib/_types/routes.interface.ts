import {
  AbonnementOptionsEnum,
  AutoOptionsEnum,
  TripOptionsEnum,
} from '@mwc/calculator';

export type IRoute = {
  abonnement: AbonnementOptionsEnum;
  car: AutoOptionsEnum;
  trip: TripOptionsEnum;
  kilometers: number;
  hasDepositPaid: boolean;
  startDate: Date;
  endDate: Date;
};
