import {
  createStore
  // applyMiddleware,
  // compose
} from 'redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
// import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './rootReducer';
import { SsrState } from './types';

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

export function configureStore(initialState: SsrState, url = '/') {
  const history = isServer ? createMemoryHistory({ initialEntries: [url] }) : createBrowserHistory();

  const store = createStore(
    createRootReducer(history),
    initialState
    // TODO это нужно или нет ?
    // compose(
    //     applyMiddleware(
    //         routerMiddleware(history)
    //     ),
    // ),
  );

  return { store, history };
}
