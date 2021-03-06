import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './app';
import { configureStore } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore().store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
