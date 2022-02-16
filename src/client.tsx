import 'babel-polyfill';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { configureStore } from './ssrStore/configureStore';
import { SsrState } from './ssrStore/types';
import { SsrApp } from './ssrApp';
import { Indexed } from './types';

const { store, history } = configureStore(window.__INITIAL_STATE__ as unknown as Indexed);

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
