import { FormEvent } from 'react';

import { SignInRequest, SignUpFormData, SignUpRequest, authAPI, mapToGameUser, mapToRawUser, userAPI } from '../api';

import handleAPIError from '../api/handleAPIError';
import { GameUser } from '../types';

import getSubmittedFormData from './getSubmittedFormData';

class AuthService {
  public static async signIn(e: FormEvent): Promise<void> {
    try {
      const signInData = getSubmittedFormData<SignInRequest>(e);
      await authAPI.signIn(signInData);
    } catch (e) {
      handleAPIError(e as Error);
    }
  }

  public static async signUp(e: FormEvent): Promise<void> {
    try {
      const newUserData = getSubmittedFormData<SignUpFormData>(e) as unknown as GameUser;
      const rawUserData = mapToRawUser(newUserData) as unknown as SignUpRequest;

      await authAPI.signUp(rawUserData);
    } catch (e) {
      handleAPIError(e as Error);
      alert(e as Error);
    }
  }

  public static async logOut(): Promise<void> {
    try {
      await authAPI.logOut();
    } catch (e) {
      handleAPIError(e as Error);
    }
  }

  public static async checkAuthorization(): Promise<GameUser | null> {
    try {
      const rawUser = await authAPI.getUser();
      const gameUser = mapToGameUser(rawUser);

      await userAPI.syncUser({ id: gameUser.id, nick: gameUser.nickname });

      return gameUser;
    } catch (e) {
      handleAPIError(e as Error);
      return null;
    }
  }
}

export default AuthService;
