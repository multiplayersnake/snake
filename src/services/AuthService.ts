import { FormEvent } from 'react';
import authAPI, { SignInRequest, SignUpRequest } from '../api/AuthAPI';
import handleAPIError from '../api/handleAPIError';

import { User } from '../types/models';
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
      let newUserData = getSubmittedFormData<SignUpRequest>(e);
      delete newUserData['nickname'];
      newUserData = Object.assign({ first_name: '', second_name: '', phone: '89215555555' }, newUserData);
      await authAPI.signUp(newUserData);
    } catch (e) {
      handleAPIError(e as Error);
    }
  }

  public static async logOut(): Promise<void> {
    try {
      await authAPI.logOut();
    } catch (e) {
      handleAPIError(e as Error);
    }
  }

  public static async checkAuthorization(): Promise<User | null> {
    try {
      const user = await authAPI.getUser();
      return user;
    } catch (e) {
      handleAPIError(e as Error);
      return null;
    }
  }
}

export default AuthService;
