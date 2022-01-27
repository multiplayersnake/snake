import { store } from './configureStore';

export type RootState = ReturnType<typeof store.getState>;

export interface BaseAction<T> {
  type: T;
}
