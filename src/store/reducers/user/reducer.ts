import { UserState, UserAction, UserActionType } from './types';
import { GameParameters, GameUser } from '../../../types';

const defaultState: UserState = {
  data: undefined
};

export function userReducer(state: UserState = defaultState, action: UserAction): UserState {
  const { type, payload } = action;

  switch (type) {
    case UserActionType.SetUser:
      return {
        ...state,
        data: payload as GameUser
      };

    // TODO логика сохранения результатов игры кажется сложноватой,
    // это может означать, для параметров игры нужен свой редьюсер, в котором будет работать удобнее
    // как вариант возможно, стоит endGameReducer переделать в gameReducer и хранить данные там...
    // правильно спроектировать стор - непростая, но важная задача %-\

    case UserActionType.SaveGameResults: {
      const { data } = state;
      const { gameParameters } = data;
      const { coins } = gameParameters;
      const { awards } = gameParameters;

      const results = payload as Partial<GameParameters>;

      const coinsUpdate = results.coins ?? 0;
      const coinsUpdated = coins + coinsUpdate;

      const awardsUpdate = results.awards ?? 0;
      const awardsUpdated = awards + awardsUpdate;

      const gameParametersUpdated = { ...gameParameters, coins: coinsUpdated, awards: awardsUpdated };

      return {
        ...state,
        data: { ...data, gameParameters: gameParametersUpdated }
      };
    }

    default:
      return state;
  }
}
