import { combineReducers } from 'redux';
import { userReducer } from './user';
import { alertReducer } from './alert';
import { confirmReducer } from './confirm';
import { endGameReducer } from './endGame';

export default combineReducers({
  user: userReducer,
  alert: alertReducer,
  confirm: confirmReducer,
  endGame: endGameReducer
});
