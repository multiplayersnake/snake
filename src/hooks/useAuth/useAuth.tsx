import { useEffect, useCallback, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { MenuActionType, MenuAction } from '../../types';
import AuthService from '../../services/AuthService';
import OAuthService from '../../services/OAuthService';
import { setUser } from '../../store';

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

  const checkAuthorization = useCallback(
    async (code?: string) => {
      if (code) {
        await OAuthService.sendCode(code);
      }

      // TODO эту логику надо перенести в redux с помощью redux-thunk
      const gameUser = await AuthService.checkAuthorization();

      dispatch(setUser(gameUser));
    },
    [dispatch]
  );

  const logIn = useCallback(
    async (e: FormEvent) => {
      // TODO эту логику надо попробовать перенести в redux с помощью redux-thunk
      await AuthService.signIn(e);
      const gameUser = await AuthService.checkAuthorization();

      dispatch(setUser(gameUser));
    },
    [dispatch]
  );

  const logInOAuth = useCallback(async () => {
    await OAuthService.signIn();
  }, []);

  const signUp = useCallback(
    async (e: FormEvent) => {
      await AuthService.signUp(e);
      const gameUser = await AuthService.checkAuthorization();

      dispatch(setUser(gameUser));
    },
    [dispatch]
  );

  const handleAction = useCallback(
    (action: MenuAction) => {
      switch (action.type) {
        case MenuActionType.Login:
          void logIn(action.payload);
          break;

        case MenuActionType.OAuthLogin:
          void logInOAuth();
          break;

        case MenuActionType.Logout:
          void logOut();
          break;

        case MenuActionType.SignUp:
          void signUp(action.payload);
          break;

        default:
          console.log('Unknown main menu action:', action);
      }
    },
    [logIn, logInOAuth, logOut, signUp]
  );

  const { search } = useLocation();

  useEffect(() => {
    const parsed = new URLSearchParams(search);
    const code = parsed.get('code');

    void checkAuthorization(code);
  }, [checkAuthorization, search]);

  return { handleAction };
}
