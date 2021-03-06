import { GameParameters, GameUser, Nullable } from '../../../types';
import { UserState, UserAction, UserActionType } from './types';

const defaultState: UserState = {
  data: undefined
};

export function userReducer(state: UserState = defaultState, action: UserAction): UserState {
  const { type, payload } = action;

  switch (type) {
    case UserActionType.SetUser:
      return {
        ...state,
        data: payload as Nullable<GameUser>
      };

    case UserActionType.SetGameResults: {
      const { data } = state;
      const { gameParameters } = data;
      const { coins, awards } = gameParameters;

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
