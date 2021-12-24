import { useCallback, useState, useMemo, FormEvent } from 'react';

import AuthService from '../../services/AuthService';
import { MenuActionType, MenuAction } from '../../types/mainMenu';
import { User } from '../../types/models';

type UseAuth = {
  authorized: boolean;
  user?: User;
  checkAuthorization: () => void;
  handleAction: (action: MenuAction) => void;
};

function useAuth(): UseAuth {
  const [user, setUser] = useState<User | undefined>(undefined);
  const authorized = useMemo(() => !!user, [user]);

  const logout = useCallback(async () => {
    await AuthService.logout();
    setUser(undefined);
  }, []);

  const checkAuthorization = useCallback(async () => {
    const user = await AuthService.checkAuthorization();
    setUser(user);
  }, []);

  const login = useCallback(async (e: FormEvent) => {
    await AuthService.signIn(e);
    const user = await AuthService.checkAuthorization();
    setUser(user);
  }, []);

  const handleAction = useCallback(
    (action: MenuAction) => {
      switch (action.type) {
        case MenuActionType.Login:
          void login(action.payload);
          break;

        case MenuActionType.Logout:
          void logout();
          break;

        default:
          console.log('Unknown main menu action:', action);
      }
    },
    [login, logout]
  );

  return { authorized, user, checkAuthorization, handleAction };
}

export default useAuth;
