import React, { useEffect, useCallback, useState, useMemo, FormEvent, ReactElement, FC } from 'react';
import { Navigate } from 'react-router-dom';

import AuthService from '../../services/AuthService';
import { MenuActionType, MenuAction } from '../../types/mainMenu';
import { User } from '../../types/models';

type UseAuth = {
  authorized: boolean;
  user: User;
  checkAuthorization: () => void;
  handleAction: (action: MenuAction) => void;
  AuthorizedOnly: FC;
  GuestOnly: FC;
};

const AUTHORIZED_DEFAULT_ROUTE = '/';
const GUEST_DEFAULT_ROUTE = '/login';

function useAuth(): UseAuth {
  const [authorizationChecked, setAuthorizationChecked] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const authorized = useMemo(() => Boolean(user), [user]);

  const AuthorizedOnly = useCallback(
    ({ children }): ReactElement => {
      if (!authorizationChecked) {
        return null;
      }

      if (!authorized) {
        return <Navigate to={GUEST_DEFAULT_ROUTE} />;
      }

      return children;
    },
    [authorizationChecked, authorized]
  );

  const GuestOnly = useCallback(
    ({ children }): ReactElement => {
      if (!authorizationChecked) {
        return null;
      }

      if (authorized) {
        return <Navigate to={AUTHORIZED_DEFAULT_ROUTE} />;
      }

      return children;
    },
    [authorizationChecked, authorized]
  );

  const logOut = useCallback(async () => {
    await AuthService.logOut();
    setUser(null);
  }, []);

  const checkAuthorization = useCallback(async () => {
    const user = await AuthService.checkAuthorization();
    setUser(user);
    setAuthorizationChecked(true);
  }, []);

  const logIn = useCallback(async (e: FormEvent) => {
    await AuthService.signIn(e);
    const user = await AuthService.checkAuthorization();
    setUser(user);
  }, []);

  const signUp = useCallback(async (e: FormEvent) => {
    await AuthService.signUp(e);
    const user = await AuthService.checkAuthorization();
    setUser(user);
  }, []);

  const handleAction = useCallback(
    (action: MenuAction) => {
      switch (action.type) {
        case MenuActionType.Login:
          void logIn(action.payload);
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
    [logIn, logOut]
  );

  useEffect(() => {
    void checkAuthorization();
  }, [checkAuthorization]);

  return { AuthorizedOnly, GuestOnly, authorized, user, checkAuthorization, handleAction };
}

export default useAuth;
