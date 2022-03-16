import BaseAPI from '../BaseAPI';
import { UserModel } from '../../database/models';

class UserAPI extends BaseAPI {
  constructor() {
    super('/users', '/api');
  }

  public syncUser(data: UserModel): Promise<void> {
    return this.http.post('/', { data });
  }
}

export const userAPI = new UserAPI();
