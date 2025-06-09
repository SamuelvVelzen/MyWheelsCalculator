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

export const TripOptions: { [key in TripOptionsEnum]: { price: number } } = {
  [TripOptionsEnum.None]: { price: 0 },
  [TripOptionsEnum.TwentyFive]: { price: 10.15 },
  [TripOptionsEnum.Fifty]: { price: 19.75 },
  [TripOptionsEnum.Hundred]: { price: 37.8 },
  [TripOptionsEnum.TwoHundred]: { price: 63 },
  [TripOptionsEnum.FourHundred]: { price: 117.5 },
  [TripOptionsEnum.Thousand]: { price: 294 },
  [TripOptionsEnum.SecondThousand]: { price: 588 },
};
