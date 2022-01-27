// Добавлен новый тип RawUser, он описывает данные в формате, в котором они уходят на сервер либо приходят с сервера
// Это реализация идеи, что на фронтенде стоит работать с данными в удобном для этого формате,
// а все конвертации (например сериализацию игровых параметров данных внутри поля second_name) стоит проводить
// перед отправкой данных на сервер или сразу после их получения
// с помощью функций конвертации - мэпперов

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
