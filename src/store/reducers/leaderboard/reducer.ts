import { LeaderboardAction, LeaderboardActionType, LeaderboardState } from './types';

const defaultLeaderboardState: LeaderboardState = {
  items: []
};

export function leaderboardReducer(
  state: LeaderboardState = defaultLeaderboardState,
  action: LeaderboardAction
): LeaderboardState {
  const { type, payload } = action;

  switch (type) {
    case LeaderboardActionType.SetLeaderboard:
      return { ...state, items: payload };

    default:
      return state;
  }
}
