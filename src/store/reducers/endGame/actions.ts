import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { GetState, RootState } from '../../types';
import { EndGameActionType, EndGameAction } from './types';
import { externalUserAPI, leaderboardAPI, mapToRawUser } from '../../../api';
import { getUser, getUserGameParameters } from '../user';

export function showEndGame(
  time: string,
  place: number,
  coins: number,
  awards: number,
  isVictory: boolean
): EndGameAction {
  return {
    type: EndGameActionType.ShowEndGame,
    payload: {
      time,
      place,
      coins,
      awards,
      isVictory
    }
  };
}

export function hideEndGame(): EndGameAction {
  return { type: EndGameActionType.HideEndGame };
}

export function finishGame(time: string, place: number, coins: number, awards: number, isVictory: boolean) {
  return async function finishGameThunk(dispatch: ThunkDispatch<RootState, void, AnyAction>, getState: GetState) {
    const state = getState();
    const userData = getUser(state);
    const gameParameters = getUserGameParameters(state);

    await dispatch(showEndGame(time, place, coins, awards, isVictory));

    const coinsUpdated = gameParameters.coins + coins;
    const awardsUpdated = gameParameters.awards + awards;
    const gameParametersUpdated = { ...gameParameters, coins: coinsUpdated, awards: awardsUpdated };
    const userDataUpdated = { ...userData, gameParameters: gameParametersUpdated };

    const rawUser = mapToRawUser(userDataUpdated);
    await externalUserAPI.updateProfile(rawUser);
    await leaderboardAPI.addItem({ user: userData.nickname, awards: awardsUpdated });
  };
}
