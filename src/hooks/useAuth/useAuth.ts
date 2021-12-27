import { useCallback, useState, useMemo, FormEvent } from 'react';

import AuthService from '../../services/AuthService';
import { MenuActionType, MenuAction } from '../../types/mainMenu';
import { User } from '../../types/models';

type UseAuth = {
  authorized: boolean;
  user: User;
  checkAuthorization: () => void;
  handleAction: (action: MenuAction) => void;
};

function useAuth(): UseAuth {
  const [user, setUser] = useState<User | null>(null);
  const authorized = useMemo(() => Boolean(user), [user]);

  const logOut = useCallback(async () => {
    await AuthService.logOut();
    setUser(null);
  }, []);

  const checkAuthorization = useCallback(async () => {
    const user = await AuthService.checkAuthorization();
    setUser(user);
  }, []);

  const logIn = useCallback(async (e: FormEvent) => {
    await AuthService.signIn(e);
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

        default:
          console.log('Unknown main menu action:', action);
      }
    },
    [logIn, logOut]
  );

  return { authorized, user, checkAuthorization, handleAction };
}

export default useAuth;
