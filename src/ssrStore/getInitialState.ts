import { RouterState } from 'connected-react-router';

import { SsrState } from './types';
import { isServer } from './rootStore';

export const getInitialState = (pathname = '/'): SsrState => {
  return {
    ssrTestData: {
      time: new Date().toLocaleString(),
      isServer: isServer
    },
    router: {
      location: { pathname, search: '', hash: '', key: '' },
      action: 'POP'
    } as RouterState
  };
};
