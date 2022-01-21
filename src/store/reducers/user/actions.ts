import { GameUser } from '../../../types';
import { UserActionType, UserAction } from './types';

export function setUser(user: GameUser): UserAction {
  return { type: UserActionType.SetUser, payload: user };
}
