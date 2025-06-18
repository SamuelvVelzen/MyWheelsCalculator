export enum AbonnementOptionsEnum {
  Start = 'start',
  Plus = 'plus',
  Pro = 'pro',
}

export const AbonnementOptions: {
  [key in AbonnementOptionsEnum]: {
    title: string;
    discount: number;
    price: string;
  };
} = {
  [AbonnementOptionsEnum.Start]: {
    title: 'Start',
    discount: 0,
    price: '0',
  },
  [AbonnementOptionsEnum.Plus]: {
    title: 'Plus',
    discount: 10,
    price: '10',
  },
  [AbonnementOptionsEnum.Pro]: {
    title: 'Pro',
    discount: 25,
    price: '25',
  },
};
