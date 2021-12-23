import authAPI, { SignInRequest, SignUpRequest } from '../api/AuthAPI';
import handleAPIError from '../api/handleAPIError';

import { User } from '../types/models';
import getSubmittedFormData from './getSubmittedFormData';

class AuthService {
  public static async signIn(e: SubmitEvent): Promise<void> {
    try {
      const signInData = getSubmittedFormData<SignInRequest>(e);
      await authAPI.signIn(signInData);
    } catch (e) {
      handleAPIError(e as Error);
    }
  }

  public static async signUp(e: Event): Promise<void> {
    try {
      const newUserData = getSubmittedFormData<SignUpRequest>(e);
      await authAPI.signUp(newUserData);
    } catch (e) {
      handleAPIError(e as Error);
    }
  }

  public static async logout(): Promise<void> {
    try {
      await authAPI.logout();
    } catch (e) {
      handleAPIError(e as Error);
    }
  }

  public static async checkAuthorization(): Promise<User | undefined> {
    try {
      const user = await authAPI.getUser();
      return user;
    } catch (e) {
      handleAPIError(e as Error);
      return undefined;
    }
  }
}

export default AuthService;
