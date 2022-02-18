import { useEffect, useCallback, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import AuthService from '../../services/AuthService';
import { MenuActionType, MenuAction } from '../../types';
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

  const checkAuthorization = useCallback(async () => {
    // TODO эту логику надо попробовать перенести в redux с помощью redux-thunk
    const gameUser = await AuthService.checkAuthorization();

    dispatch(setUser(gameUser));
  }, [dispatch]);

  const logIn = useCallback(
    async (e: FormEvent) => {
      // TODO эту логику надо попробовать перенести в redux с помощью redux-thunk
      await AuthService.signIn(e);
      const gameUser = await AuthService.checkAuthorization();

      dispatch(setUser(gameUser));
    },
    [dispatch]
  );

  const logInOauth = useCallback(
    async (e: FormEvent) => {
      await AuthService.signInOauth(e);
    },
    [dispatch]
  )

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

        case MenuActionType.LoginOauth:
          void logInOauth(action.payload);
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
    [logIn, logInOauth, logOut, signUp]
  );

  useEffect(() => {
    void checkAuthorization();
  }, [checkAuthorization]);

  return { handleAction };
}
