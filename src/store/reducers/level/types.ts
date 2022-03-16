import { BaseAction } from '../../types';

export type LevelState = {
  value: number;
};

export enum LevelActionType {
  SetLevel = 'SetLevel'
}

export interface LevelAction extends BaseAction<LevelActionType> {
  payload: LevelState;
}
