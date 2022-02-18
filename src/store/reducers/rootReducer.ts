import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { userReducer } from './user';
import { modalReducer } from './modal';
import { endGameReducer } from './endGame';

export function createRootReducer(history: History) {
  return combineReducers({
    user: userReducer,
    modal: modalReducer,
    endGame: endGameReducer,
    router: connectRouter(history)
  });
}
