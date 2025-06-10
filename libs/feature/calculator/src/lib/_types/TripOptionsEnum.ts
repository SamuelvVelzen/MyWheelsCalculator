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
  [key in TripOptionsEnum]: { price: number; title: string };
} = {
  [TripOptionsEnum.None]: { price: 0, title: 'Geen' },
  [TripOptionsEnum.TwentyFive]: { price: 10.15, title: '25 km' },
  [TripOptionsEnum.Fifty]: { price: 19.75, title: '50 km' },
  [TripOptionsEnum.Hundred]: { price: 37.8, title: '100 km' },
  [TripOptionsEnum.TwoHundred]: { price: 63, title: '200 km' },
  [TripOptionsEnum.FourHundred]: { price: 117.5, title: '400 km' },
  [TripOptionsEnum.Thousand]: { price: 294, title: '1000 km' },
  [TripOptionsEnum.SecondThousand]: { price: 588, title: '2000 km' },
};
