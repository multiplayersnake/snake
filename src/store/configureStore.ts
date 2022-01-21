import { createStore } from 'redux';

import { Indexed } from '../types';

import { rootReducer } from './reducers';

function configureStore(preloadedState: Indexed = {}) {
  return createStore(rootReducer, preloadedState);
}

export const store = configureStore();
