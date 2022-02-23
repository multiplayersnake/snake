import { FormEvent } from 'react';

export enum MenuActionType {
  Login = 'Login',
  OAuthLogin = 'OAuthLogin',
  Logout = 'Logout',
  SignUp = 'SignUp'
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
