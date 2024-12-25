type Raffle = {
  id: number;
  date: string;
  num1: number;
  num2: number;
  num3: number;
  num4: number;
  num5: number;
  num6: number;
};

type AwardsObject = {
  raffle: number[];
  hits: number[];
  misses: number[];
};

type Awards = {
  fourth: AwardsObject[];
  fifth: AwardsObject[];
  sixth: AwardsObject[];
  total: number;
};

export { Raffle, Awards };
