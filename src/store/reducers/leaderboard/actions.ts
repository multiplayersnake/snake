import { Dispatch } from 'redux';

import { leaderboardAPI } from '../../../api';
import { LeaderboardItem } from '../../../types';
import { LeaderboardAction, LeaderboardActionType } from './types';

export function setLeaderboard(items: LeaderboardItem[]): LeaderboardAction {
  return {
    type: LeaderboardActionType.SetLeaderboard,
    payload: items
  };
}

export function fetchLeaderboard() {
  return async function fetchLeaderboardThunk(dispatch: Dispatch) {
    const items = await leaderboardAPI.getItems();
    dispatch(setLeaderboard(items));
  };
}
