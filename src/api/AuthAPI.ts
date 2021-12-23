import BaseAPI from './BaseAPI';
import { User } from '../types/models';

export interface SignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignUpResponse {
  id: number;
}

export interface SignInRequest {
  login: string;
  password: string;
}

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

  public logout(): Promise<void> {
    return this.http.post<void>('/logout');
  }

  public getUser(): Promise<User> {
    return this.http.get<User>('/user');
  }
}

export default new AuthAPI();
