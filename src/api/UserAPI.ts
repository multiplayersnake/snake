import BaseAPI from './BaseAPI';

export type ProfileRequest = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public profile(data: ProfileRequest): Promise<void> {
    return this.http.put<void>('/profile', { data });
  }
}

export default new UserAPI();
