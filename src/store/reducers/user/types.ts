import { Nullable, GameUser, GameParameters } from '../../../types';
import { BaseAction } from '../../types';

export type UserState = {
  data: Nullable<GameUser>;
};

export enum UserActionType {
  SetTheme = 'SetTheme',
  SetUser = 'SetUser',
  SetGameResults = 'SetGameResults'
}

export interface UserAction extends BaseAction<UserActionType> {
  payload: GameUser | Partial<GameParameters> | string | undefined;
}
