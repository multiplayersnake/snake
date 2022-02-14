import { SsrState } from './types';
import { RouterState } from 'connected-react-router';

export const getInitialState = (pathname = '/'): SsrState => {
  return {
    main: {
      name: new Date().toLocaleString()
    },
    router: {
      location: { pathname, search: '', hash: '', key: '' },
      action: 'POP'
    } as RouterState
  };
};
