// TODO перенести к API
export interface RawUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface GameUser {
  readonly id: number;
  readonly login: string;
  readonly email: string;
  readonly gameParameters: GameParameters;
  readonly nickname: string;
}

export type GameParameters = {
  snake: number;
  coins: number;
  awards: number;
  parts: number[];
  byItems: number[][];
};
