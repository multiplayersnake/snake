import { EndGameState, EndGameAction, EndGameActionType } from './types';

const defaultState: EndGameState = {
  time: '',
  place: 0,
  coins: 0,
  awards: 0,
  isGameOver: false,
  isVictory: false
};

export function endGameReducer(state: EndGameState = defaultState, action: EndGameAction): EndGameState {
  const { type, payload } = action;

  switch (type) {
    case EndGameActionType.ShowEndGame:
      return { ...state, ...payload, isGameOver: true };

    case EndGameActionType.HideEndGame:
      return { ...state, isGameOver: false };

    default:
      return state;
  }
}
