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
      const newUserData = getSubmittedFormData<SignUpRequest>(e);
      const placeholderData = { second_name: '', phone: '0000000000' };
      const data = { ...newUserData, ...placeholderData };
      await authAPI.signUp(data);
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
