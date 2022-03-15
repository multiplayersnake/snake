import { GameParameters, GameUser } from '../../../types';
import { UserActionType, UserAction } from './types';

export function setUser(user: GameUser): UserAction {
  return { type: UserActionType.SetUser, payload: user };
}

export function saveGameResults(update: Partial<GameParameters>): UserAction {
  return { type: UserActionType.SaveGameResults, payload: update };
}
