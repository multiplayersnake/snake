import { configureStore } from './configureStore';

export type RootState = ReturnType<ReturnType<typeof configureStore>['store']['getState']>;

export interface BaseAction<T> {
  type: T;
}
