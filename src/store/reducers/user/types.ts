import { Nullable, GameUser, GameParameters } from '../../../types';
import { BaseAction } from '../../types';

export type UserState = {
  data: Nullable<GameUser>;
};

export enum UserActionType {
  SetUser = 'SetUser',
  MergeGameParameters = 'MergeGameParameters',
  SaveGameResults = 'SaveGameResults'
}

export interface UserAction extends BaseAction<UserActionType> {
  payload: GameUser | Partial<GameParameters>;
}

// TODO удалить, если не понадобится
export enum VacancyWorkingActivitiesTabStep {
  ActivityStatusEdit = 'ActivityStatusEdit',
  ActivityTimeEdit = 'ActivityTimeEdit',
  TableView = 'TableView',
  TransferOrRemoval = 'TransferOrRemoval'
}
