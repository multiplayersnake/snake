import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { userReducer } from './user';
import { modalReducer } from './modal';
import { endGameReducer } from './endGame';
import { levelReducer } from './level';
import { forumReducer } from './forum';
import { leaderboardReducer } from './leaderboard';

export function createRootReducer(history: History) {
  return combineReducers({
    user: userReducer,
    modal: modalReducer,
    endGame: endGameReducer,
    level: levelReducer,
    forum: forumReducer,
    leaderboard: leaderboardReducer,
    router: connectRouter(history)
  });
}
