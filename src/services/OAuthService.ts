import { oauthAPI } from '../api/OAuthAPI';
import handleAPIError from '../api/handleAPIError';

// TODO сделать функцию получения redirect_uri
const redirect_uri = 'http://localhost:3000';

class OAuthService {
  public static async signIn(): Promise<void> {
    try {
      const { service_id } = await oauthAPI.getServiceId(redirect_uri);

      window.open(
        `https://oauth.yandex.ru/authorize?response_type=code&client_id=${service_id}&redirect_uri=${redirect_uri}`
      );
    } catch (e) {
      handleAPIError(e as Error);
    }
  }

  public static async sendCode(code: string): Promise<void> {
    try {
      const data = { code, redirect_uri };
      await oauthAPI.signIn(data);
    } catch (e) {
      handleAPIError(e as Error);
    }
  }
}

export default OAuthService;
