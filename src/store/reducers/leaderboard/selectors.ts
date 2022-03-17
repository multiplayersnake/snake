import { LeaderboardItem } from '../../../types';
import { RootState } from '../../types';

export function getLeaderboardItems(state: RootState): LeaderboardItem[] {
  return state.leaderboard.items;
}
