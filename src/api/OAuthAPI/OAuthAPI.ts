import BaseAPI from '../BaseAPI';

export type OAuthServiceIdResponse = {
  service_id: string;
};

export type OAuthSignInRequest = {
  code: string;
  redirect_uri: string;
};

class OAuthAPI extends BaseAPI {
  constructor() {
    super('/oauth');
  }

  public getServiceId(redirectUri: string): Promise<OAuthServiceIdResponse> {
    return this.http.get<OAuthServiceIdResponse>(`/yandex/service-id?redirect_uri=${redirectUri}`);
  }

  public signIn(data: OAuthSignInRequest): Promise<void> {
    return this.http.post<void>('/yandex', { data });
  }
}

export const oauthAPI = new OAuthAPI();
