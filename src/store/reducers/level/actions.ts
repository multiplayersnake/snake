import { LevelActionType, LevelAction } from './types';

export function setLevel(value: number): LevelAction {
  return {
    type: LevelActionType.SetLevel,
    payload: {
      value
    }
  };
}
