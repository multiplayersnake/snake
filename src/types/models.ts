export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface GameParameters {
  snake: boolean;
  coins: number;
  awards: number;
  head: number;
  body: number;
  tail: number;
  elixir: number;
}
