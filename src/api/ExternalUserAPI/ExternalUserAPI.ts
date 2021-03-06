import BaseAPI from '../BaseAPI';

export type UpdateProfileRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

class ExternalUserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public updateProfile(data: UpdateProfileRequest): Promise<void> {
    return this.http.put<void>('/profile', { data });
  }
}

export const externalUserAPI = new ExternalUserAPI();
