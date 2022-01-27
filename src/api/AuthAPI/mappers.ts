import { GameParameters, GameUser, RawUser } from '../../types';
import { parseSerializedData } from '../../utils';

const currentGameParametersVersion = 1006;

const defaultGameParameters = {
  snake: currentGameParametersVersion,
  coins: 9000,
  awards: 500,
  parts: [0, 0, 0],
  byItems: [[0], [0], [0]]
};

// Это мэпперы - функции конвертации данных из формата, в котором удобно работать на фронтенде, в формат бэкенда, и наоборот.
// Их стоит хранить и использовать рядом с API.

export function mapToGameUser(rawUser: RawUser): GameUser {
  const { first_name, second_name, display_name, phone, ...user } = rawUser;
  const nickname = first_name;
  const parsedGameParameters = parseSerializedData<GameParameters>(second_name);
  const gameParameters =
    !parsedGameParameters || parsedGameParameters.snake !== currentGameParametersVersion
      ? defaultGameParameters
      : parsedGameParameters;

  return { ...user, nickname, gameParameters };
}

export function mapToRawUser(gameUser: GameUser): RawUser {
  const { nickname, gameParameters, ...user } = gameUser;
  const first_name = nickname;
  const second_name = gameParameters ? JSON.stringify(gameParameters) : '';
  const display_name = '';
  const phone = '0000000000';

  return { ...user, first_name, second_name, display_name, phone };
}
