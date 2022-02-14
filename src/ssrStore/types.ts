import { RouterState } from 'connected-react-router';

export interface SsrState {
  ssrTestData: {
    time: string;
    isServer: boolean;
  };
  router: RouterState;
}
