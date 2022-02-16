import { configureStore } from './configureStore';

export type SsrState = ReturnType<ReturnType<typeof configureStore>['store']['getState']>;

export interface BaseAction<T> {
  type: T;
}
