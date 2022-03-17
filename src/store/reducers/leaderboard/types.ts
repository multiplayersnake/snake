import { LeaderboardItem } from '../../../types';
import { BaseAction } from '../../types';

export type LeaderboardState = {
  items: LeaderboardItem[];
};

export enum LeaderboardActionType {
  SetLeaderboard = 'SetLeaderboard'
}

export type LeaderboardActionPayload = LeaderboardItem[];

export interface LeaderboardAction extends BaseAction<LeaderboardActionType> {
  payload?: LeaderboardActionPayload;
}
