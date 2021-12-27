import HTTP from './HTTP';

export default abstract class BaseAPI {
  protected http: HTTP;

  protected constructor(endpoint: string) {
    this.http = new HTTP(endpoint);
  }
}
