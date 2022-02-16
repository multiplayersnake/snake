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

export type ServiceId = {
  service_id : string;
};

export type signInWithYandexRequest = {
  code : string;
  redirect_uri : string;
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

  public logOut(): Promise<void> {
    return this.http.post<void>('/logout');
  }

  public getUser(): Promise<RawUser> {
    return this.http.get<RawUser>('/user');
  }
}

class OAuthAPI extends BaseAPI {
  constructor() {
    super('/oauth');
  }

  public getServiceId(): Promise<ServiceId> {
    return this.http.get<ServiceId>('/yandex/service-id?redirect_uri=http://localhost:8080/');
  }

  public signInWithYandex(data: signInWithYandexRequest ): Promise<void> {
    return this.http.post<void>('/yandex', { data });
  }

}

export const authAPI = new AuthAPI();
export const oauthAPI = new OAuthAPI();
