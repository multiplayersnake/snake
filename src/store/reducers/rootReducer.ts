import { combineReducers } from 'redux';

import { userReducer } from './user';
import { modalReducer } from './modal';
import { endGameReducer } from './endGame';

export const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  endGame: endGameReducer
});
