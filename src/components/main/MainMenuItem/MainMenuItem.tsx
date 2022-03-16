import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, getAuthorized } from '../../../store';
import { MenuItemType } from '../../../types';
import { Button, NavButton } from '../..';

type MainMenuItemProps = {
  item: MenuItemType;
};

export const MainMenuItem: FC<MainMenuItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const authorized = useSelector<RootState, boolean>(getAuthorized);
  const { title, action, path, authorizedOnly } = item;

  const handleAction = useCallback(() => {
    dispatch(action());
  }, [action, dispatch]);

  if (authorizedOnly && !authorized) {
    return null;
  }

  if (path) {
    return <NavButton to={path}>{title}</NavButton>;
  }

  return <Button onClick={handleAction}>{title}</Button>;
};
