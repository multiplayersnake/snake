import { Nullable, GameUser } from '../../../types';
import { BaseAction } from '../../types';

export type UserState = {
  data: Nullable<GameUser>;
};

export enum UserActionType {
  SetUser = 'SetUser'
}

export enum VacancyWorkingActivitiesTabStep {
  ActivityStatusEdit = 'ActivityStatusEdit',
  ActivityTimeEdit = 'ActivityTimeEdit',
  TableView = 'TableView',
  TransferOrRemoval = 'TransferOrRemoval'
}

export interface UserAction extends BaseAction<UserActionType> {
  payload: GameUser;
}
