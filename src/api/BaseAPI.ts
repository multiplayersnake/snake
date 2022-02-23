import HTTP from './HTTP';

export default abstract class BaseAPI {
  protected http: HTTP;

  protected constructor(endpoint: string, baseUrl = 'https://ya-praktikum.tech/api/v2') {
    this.http = new HTTP(endpoint, baseUrl);
  }
}
