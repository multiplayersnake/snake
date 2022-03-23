import { Nullable, GameUser, GameParameters } from '../../../types';
import { BaseAction } from '../../types';

export type UserState = {
  data: Nullable<GameUser>;
};

export enum UserActionType {
  SetUser = 'SetUser',
  SetGameResults = 'SetGameResults'
}

export interface UserAction extends BaseAction<UserActionType> {
  payload: Nullable<GameUser> | Partial<GameParameters>;
}
