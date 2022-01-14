import { createStore } from 'redux';
import reducer from './reducers';

export default function configureStore(preloadedState: any) {
  return createStore(reducer, preloadedState);
}
