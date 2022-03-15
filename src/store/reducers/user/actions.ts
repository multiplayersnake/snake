import { Dispatch } from 'redux';

import OAuthService from '../../../services/OAuthService';
import AuthService from '../../../services/AuthService';

import { GameParameters, GameUser } from '../../../types';
import { UserActionType, UserAction } from './types';
import { FormEvent } from 'react';

export function setUser(user: GameUser): UserAction {
  return { type: UserActionType.SetUser, payload: user };
}

export function saveGameResults(update: Partial<GameParameters>): UserAction {
  return { type: UserActionType.SaveGameResults, payload: update };
}

export function checkAuthorization(code?: string) {
  return async function checkAuthorizationThunk(dispatch: Dispatch) {
    if (code) {
      await OAuthService.sendCode(code);
    }

    const gameUser = await AuthService.checkAuthorization();

    dispatch(setUser(gameUser));
  };
}

export function logIn(e: FormEvent) {
  return async function logInThunk(dispatch: Dispatch) {
    await AuthService.signIn(e);

    const gameUser = await AuthService.checkAuthorization();

    dispatch(setUser(gameUser));

    const form = e.target as HTMLFormElement;
    form.reset();
  };
}

export function signUp(e: FormEvent) {
  return async function logInThunk(dispatch: Dispatch) {
    await AuthService.signUp(e);

    const gameUser = await AuthService.checkAuthorization();

    dispatch(setUser(gameUser));

    const form = e.target as HTMLFormElement;
    form.reset();
  };
}
