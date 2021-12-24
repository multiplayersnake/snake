import { FormEvent } from 'react';

export enum MenuActionType {
  Login = 'Login',
  Logout = 'Logout'
}

export type MenuActionPayload = FormEvent;

export type MenuAction = {
  type: MenuActionType;
  payload?: MenuActionPayload;
};

export type MenuItemType = {
  title: string;
  path?: string;
  action?: MenuActionType;
  authorizedOnly?: boolean;
};
