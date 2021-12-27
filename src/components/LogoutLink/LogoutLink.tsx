import React, { FC, useCallback } from 'react';

import { MenuAction, MenuActionType } from '../../types/mainMenu';

type LogoutLinkProps = {
  onClick: (action: MenuAction) => void;
};

const LogoutLink: FC<LogoutLinkProps> = ({ onClick }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      onClick({ type: MenuActionType.Logout });
    },
    [onClick]
  );

  return (
    <a href="/" onClick={handleClick}>
      Выйти
    </a>
  );
};

export default LogoutLink;
