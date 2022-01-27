import { RawUser } from '../../types';
import BaseAPI from '../BaseAPI';

export type SignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type SignUpFormData = {
  login: string;
  password: string;
  email: string;
  nickname: string;
};

export type SignUpResponse = {
  id: number;
};

export type SignInRequest = {
  login: string;
  password: string;
};

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signUp(data: SignUpRequest): Promise<SignUpResponse> {
    return this.http.post<SignUpResponse>('/signup', { data });
  }

  public signIn(data: SignInRequest): Promise<void> {
    return this.http.post<void>('/signin', { data });
  }

  public logOut(): Promise<void> {
    return this.http.post<void>('/logout');
  }

  public getUser(): Promise<RawUser> {
    return this.http.get<RawUser>('/user');
  }
}

export const authAPI = new AuthAPI();
