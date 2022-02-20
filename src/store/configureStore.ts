import {
  createStore,
  // TODO проверить, работает ли стор без routerMiddleware
  applyMiddleware,
  compose
} from 'redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
// TODO проверить, работает ли стор без routerMiddleware
import { routerMiddleware } from 'connected-react-router';

import { isServer } from '../utils';
import { Indexed } from '../types';

import { createRootReducer } from './reducers';

export function configureStore(initialState: Indexed = {}, url = '/') {
  const history = isServer ? createMemoryHistory({ initialEntries: [url] }) : createBrowserHistory();
  const store = createStore(
    createRootReducer(history),
    initialState,
    // TODO проверить, работает ли стор без routerMiddleware
    compose(applyMiddleware(routerMiddleware(history)))
  );

  return { store, history };
}
