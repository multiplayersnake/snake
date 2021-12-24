import React, { FC, useCallback } from 'react';

import Button from '../../components/Button';
import NavButton from '../../components/Button/NavButton';

import { MenuItemType, MenuAction } from '../../types/mainMenu';

type MainMenuItemProps = {
  item: MenuItemType;
  authorized: boolean;
  onAction: (action: MenuAction) => void;
};

const MainMenuItem: FC<MainMenuItemProps> = ({ authorized, onAction, item }) => {
  const { title, action, path, authorizedOnly } = item;

  const handleAction = useCallback(() => {
    onAction({ type: action });
  }, [action, onAction]);

  if (authorizedOnly && !authorized) {
    return null;
  }

  if (path) {
    return <NavButton to={path}>{title}</NavButton>;
  }

  return <Button onClick={handleAction}>{title}</Button>;
};

export default MainMenuItem;
