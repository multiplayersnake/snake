import { RouterState } from 'connected-react-router';

export interface SsrState {
  main: {
    name: string;
  };
  router: RouterState;
}
