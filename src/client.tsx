import 'babel-polyfill';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { configureStore } from './ssrStore/rootStore';
import { SsrState } from './ssrStore/types';
import { SsrApp } from './ssrApp';

const { store, history } = configureStore(window.__INITIAL_STATE__);

declare global {
  interface Window {
    __INITIAL_STATE__: SsrState;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => void;
  }
}

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SsrApp />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('mount')
);
