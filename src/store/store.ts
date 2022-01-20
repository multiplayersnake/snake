import { createStore } from 'redux';
import reducer from './reducers';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
export default function configureStore(preloadedState: any) {
  return createStore(reducer, preloadedState);
}
