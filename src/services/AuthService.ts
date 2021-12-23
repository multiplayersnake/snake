import authAPI, { SignInRequest, SignUpRequest } from '../api/AuthAPI';
import getSubmittedFormData from './getSubmittedFormData';
import handleError from './handleError';

class AuthService {
  public static async signIn(e: SubmitEvent): Promise<void> {
    try {
      const credentials = getSubmittedFormData<SignInRequest>(e);

      console.log('credentials:', credentials);

      await authAPI.signIn(credentials);

      console.log('signIn OK');
    } catch (error) {
      handleError(error);
    }
  }

  public static async signUp(e: Event): Promise<void> {
    try {
      const newUserData = getSubmittedFormData<SignUpRequest>(e);

      await authAPI.signUp(newUserData);

      console.log('signUp OK');
    } catch (error) {
      handleError(error);
    }
  }

  public static async logout(): Promise<void> {
    try {
      await authAPI.logout();

      console.log('logout OK');
    } catch (error) {
      handleError(error);
    }
  }

  public static async checkAuthorization(): Promise<void> {
    try {
      const user = await authAPI.getUser();

      console.log('current user:', user);
    } catch (error) {
      handleError(error);
    }
  }
}

export default AuthService;
