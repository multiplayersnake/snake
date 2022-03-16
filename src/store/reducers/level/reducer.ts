import { LevelState, LevelAction, LevelActionType } from './types';

const defaultState: LevelState = {
  value: 0
};

export function levelReducer(state: LevelState = defaultState, action: LevelAction): LevelState {
  const { type, payload } = action;

  switch (type) {
    case LevelActionType.SetLevel:
      return { ...state, ...payload };

    default:
      return state;
  }
}
