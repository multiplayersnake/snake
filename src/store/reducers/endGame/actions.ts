import { EndGameActionType, EndGameAction } from './types';

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
