export enum TripOptionsEnum {
  None = 'none',
  TwentyFive = 'twentyFive',
  Fifty = 'fifty',
  Hundred = 'hundred',
  TwoHundred = 'twoHundred',
  FourHundred = 'fourHundred',
  Thousand = 'thousand',
  SecondThousand = 'secondThousand',
}

export const TripOptions: {
  [key in TripOptionsEnum]: {
    price: number;
    title: string;
    freeKm: number;
    queryParamIdentifier: string;
  };
} = {
  [TripOptionsEnum.None]: {
    price: 0,
    title: 'Geen',
    freeKm: 0,
    queryParamIdentifier: '0',
  },
  [TripOptionsEnum.TwentyFive]: {
    price: 10.15,
    title: '25 km',
    freeKm: 25,
    queryParamIdentifier: '25',
  },
  [TripOptionsEnum.Fifty]: {
    price: 19.75,
    title: '50 km',
    freeKm: 50,
    queryParamIdentifier: '50',
  },
  [TripOptionsEnum.Hundred]: {
    price: 37.8,
    title: '100 km',
    freeKm: 100,
    queryParamIdentifier: '100',
  },
  [TripOptionsEnum.TwoHundred]: {
    price: 63,
    title: '200 km',
    freeKm: 200,
    queryParamIdentifier: '200',
  },
  [TripOptionsEnum.FourHundred]: {
    price: 117.5,
    title: '400 km',
    freeKm: 400,
    queryParamIdentifier: '400',
  },
  [TripOptionsEnum.Thousand]: {
    price: 294,
    title: '1000 km',
    freeKm: 1000,
    queryParamIdentifier: '1000',
  },
  [TripOptionsEnum.SecondThousand]: {
    price: 588,
    title: '2000 km',
    freeKm: 2000,
    queryParamIdentifier: '2000',
  },
};
