type Actions = 'SHOW_END_GAME' | 'HIDE_END_GAME';

const actions = {
  SHOW_END_GAME: 'SHOW_END_GAME',
  HIDE_END_GAME: 'HIDE_END_GAME'
};

type EndGameState = {
  time: string;
  place: number;
  coins: number;
  awards: number;
  isVisible: boolean;
};

const defaultState: EndGameState = {
  time: '',
  place: 0,
  coins: 0,
  awards: 0,
  isVisible: false
};

interface BaseActionType<T> {
  type: T;
}

interface ItemActionType extends BaseActionType<Actions> {
  time?: string;
  place?: number;
  coins?: number;
  awards?: number;
  isVisible?: boolean;
}

export function endGameReducer(
  state: EndGameState = defaultState,
  { type, time, place, coins, awards }: ItemActionType
): EndGameState {
  switch (type) {
    case actions.SHOW_END_GAME:
      return {
        ...state,
        time,
        place,
        coins,
        awards,
        isVisible: true
      };
    case actions.HIDE_END_GAME:
      return {
        ...state,
        isVisible: false
      };
    default:
      return state;
  }
}

export function showEndGame(time: string, place: number, coins: number, awards: number): ItemActionType {
  return { type: 'SHOW_END_GAME', time: time, place: place, coins: coins, awards: awards, isVisible: true };
}

export function hideEndGame(): ItemActionType {
  return { type: 'HIDE_END_GAME' };
}
