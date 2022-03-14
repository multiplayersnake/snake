import BaseAPI from '../BaseAPI';
import { UserModel } from '../../database/models';

class UserAPI extends BaseAPI {
  constructor() {
    super('/user', '/api');
  }

  public createUser(data: UserModel): Promise<void> {
    return this.http.post('/', { data });
  }
}

export const userAPI = new UserAPI();
