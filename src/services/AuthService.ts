import { FormEvent } from 'react';

import { authAPI, oauthAPI, SignInRequest, SignUpRequest, mapToGameUser, mapToRawUser, SignUpFormData } from '../api/AuthAPI';
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

  public static async signInOauth(e: FormEvent): Promise<void> {
    try {
      //const service_id = await oauthAPI.getServiceId();
      // const code = { 'code' : '6435539' }
      // const redirect_uri = { 'redirect_uri' : 'http://localhost:8080/login' }
      // const data = Object.assign(code, redirect_uri);
      //console.log(service_id, data);


      window.location.assign('https://oauth.yandex.ru/authorize?response_type=code&client_id=59acdab40995401da2c8668002b2886b&redirect_uri=http://localhost:8080/login');

      // setTimeout(() => {
      //   const query = window.location;
      //   console.log(query);
      //   }, 5000);


      //await oauthAPI.signInWithYandex(data)
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

      return gameUser;
    } catch (e) {
      handleAPIError(e as Error);
      return null;
    }
  }
}

export default AuthService;
