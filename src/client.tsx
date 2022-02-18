import 'babel-polyfill';
import * as React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { configureStore } from './store/configureStore';
import { RootState } from './store/types';
import { ClientApp } from './app/ClientApp';
import { Indexed } from './types';

const { store, history } = configureStore(window.__INITIAL_STATE__ as unknown as Indexed);

delete window.__INITIAL_STATE__;

declare global {
  interface Window {
    __INITIAL_STATE__: RootState;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => void;
  }
}

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ClientApp />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('mount')
);
