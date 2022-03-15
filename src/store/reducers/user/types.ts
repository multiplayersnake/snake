import { Nullable, GameUser, GameParameters } from '../../../types';
import { BaseAction } from '../../types';

export type UserState = {
  data: Nullable<GameUser>;
};

export enum UserActionType {
  SetUser = 'SetUser',
  SaveGameResults = 'SaveGameResults'
}

export interface UserAction extends BaseAction<UserActionType> {
  payload: GameUser | Partial<GameParameters>;
}
