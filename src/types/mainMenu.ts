import { AnyAction } from 'redux';

export type MenuItemType = {
  title: string;
  path?: string;
  action?: () => AnyAction;
  authorizedOnly?: boolean;
};
