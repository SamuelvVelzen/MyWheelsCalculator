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
  hasStartPrice: boolean;
  hasDepositPaid: boolean;
  startDate: Date;
  endDate: Date;
};
