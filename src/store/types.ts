import { configureStore } from './configureStore';

export type GetState = ReturnType<typeof configureStore>['store']['getState'];
export type RootState = ReturnType<GetState>;

export interface BaseAction<T> {
  type: T;
}
