import React, { FC, useCallback } from 'react';

import './LogoutLink.css';
import AuthService from '../../services/AuthService';

type LogoutLinkProps = {
  onLogout: () => void;
};

const LogoutLink: FC<LogoutLinkProps> = ({ onLogout }) => {
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();

      async function logout() {
        await AuthService.logout();
        onLogout();
      }

      void logout();
    },
    [onLogout]
  );

  return (
    <a href="#" onClick={handleClick}>
      Выйти
    </a>
  );
};

export default LogoutLink;
