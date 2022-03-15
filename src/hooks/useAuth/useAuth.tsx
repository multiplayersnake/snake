import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { MenuActionType, MenuAction } from '../../types';
import AuthService from '../../services/AuthService';
import { setUser, checkAuthorization } from '../../store';

type UseAuth = {
  handleAction: (action: MenuAction) => void;
};

export function useAuth(): UseAuth {
  const dispatch = useDispatch();

  const logOut = useCallback(async () => {
    // TODO эту логику надо попробовать перенести в redux с помощью redux-thunk
    await AuthService.logOut();
    dispatch(setUser(null));
  }, [dispatch]);

  const handleAction = useCallback(
    (action: MenuAction) => {
      switch (action.type) {
        case MenuActionType.Logout:
          void logOut();
          break;

        default:
          console.log('Unknown main menu action:', action);
      }
    },
    [logOut]
  );

  const { search } = useLocation();

  useEffect(() => {
    const parsed = new URLSearchParams(search);
    const code = parsed.get('code');

    dispatch(checkAuthorization(code));
  }, [dispatch, search]);

  return { handleAction };
}
