import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory, createMemoryHistory } from 'history';

import { isServer } from '../utils';
import { Indexed } from '../types';

import { createRootReducer } from './reducers';

export function configureStore(initialState: Indexed = {}, url = '/') {
  const history = isServer ? createMemoryHistory({ initialEntries: [url] }) : createBrowserHistory();
  const store = createStore(createRootReducer(history), initialState, compose(applyMiddleware(thunk)));

  return { store, history };
}
