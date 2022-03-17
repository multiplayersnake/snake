import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from '../store';

export type MenuItemType = {
  title: string;
  path?: string;
  action?: () => ThunkAction<void, RootState, void, AnyAction>;
  authorizedOnly?: boolean;
};
