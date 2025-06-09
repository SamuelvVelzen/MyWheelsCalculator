import { AbonnementOptionsEnum } from './AbonnementOptionsEnum';

export enum AutoOptionsEnum {
  Compact = 'compact',
  Comfort = 'comfort',
  Extra = 'extra',
  Premium = 'premium',
}

export const AutoOptions: Record<
  AbonnementOptionsEnum,
  Record<AutoOptionsEnum, { kmPrice: number; hourPrice: number }>
> = {
  [AbonnementOptionsEnum.Start]: {
    [AutoOptionsEnum.Compact]: { kmPrice: 0.37, hourPrice: 3.49 },
    [AutoOptionsEnum.Comfort]: { kmPrice: 0.42, hourPrice: 4.19 },
    [AutoOptionsEnum.Extra]: { kmPrice: 0.45, hourPrice: 4.89 },
    [AutoOptionsEnum.Premium]: { kmPrice: 0.48, hourPrice: 5.39 },
  },
  [AbonnementOptionsEnum.Plus]: {
    [AutoOptionsEnum.Compact]: { kmPrice: 0.33, hourPrice: 3.14 },
    [AutoOptionsEnum.Comfort]: { kmPrice: 0.38, hourPrice: 3.77 },
    [AutoOptionsEnum.Extra]: { kmPrice: 0.41, hourPrice: 4.4 },
    [AutoOptionsEnum.Premium]: { kmPrice: 0.43, hourPrice: 4.85 },
  },
  [AbonnementOptionsEnum.Pro]: {
    [AutoOptionsEnum.Compact]: { kmPrice: 0.28, hourPrice: 2.62 },
    [AutoOptionsEnum.Comfort]: { kmPrice: 0.32, hourPrice: 3.14 },
    [AutoOptionsEnum.Extra]: { kmPrice: 0.34, hourPrice: 3.67 },
    [AutoOptionsEnum.Premium]: { kmPrice: 0.36, hourPrice: 4.04 },
  },
};
