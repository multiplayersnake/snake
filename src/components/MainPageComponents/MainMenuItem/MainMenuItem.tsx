import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';

import Button from '../../Button';
import NavButton from '../../Button/NavButton';

import { MenuItemType, MenuAction } from '../../../types';
import { RootState } from '../../../store';
import { getAuthorized } from '../../../store/reducers/user';

type MainMenuItemProps = {
  item: MenuItemType;
  onAction: (action: MenuAction) => void;
};

const MainMenuItem: FC<MainMenuItemProps> = ({ onAction, item }) => {
  const authorized = useSelector<RootState, boolean>(getAuthorized);
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
