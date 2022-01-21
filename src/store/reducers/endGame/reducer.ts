import { EndGameState, EndGameAction, EndGameActionType } from './types';

const defaultState: EndGameState = {
  time: '',
  place: 0,
  coins: 0,
  awards: 0,
  isVisible: false
};

export function endGameReducer(state: EndGameState = defaultState, action: EndGameAction): EndGameState {
  const { type, payload } = action;

  switch (type) {
    case EndGameActionType.ShowEndGame:
      return { ...state, ...payload, isVisible: true };

    case EndGameActionType.HideEndGame:
      return { ...state, isVisible: false };

    default:
      return state;
  }
}
