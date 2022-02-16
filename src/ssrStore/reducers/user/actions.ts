import { GameParameters, GameUser } from '../../../types';
import { UserActionType, UserAction } from './types';

export function setUser(user: GameUser): UserAction {
  return { type: UserActionType.SetUser, payload: user };
}

// TODO удалить, если не понадобится
export function mergeGameParameters(update: Partial<GameParameters>): UserAction {
  return { type: UserActionType.MergeGameParameters, payload: update };
}

export function saveGameResults(update: Partial<GameParameters>): UserAction {
  return { type: UserActionType.SaveGameResults, payload: update };
}
