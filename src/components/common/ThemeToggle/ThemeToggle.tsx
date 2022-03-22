import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTheme, RootState, toggleTheme } from '../../../store';
import { Button } from '../Button';

import themeToggleIcon from '../../../assets/images/themeToggle.png';

import './ThemeToggle.css';

export const ThemeToggle = () => {
  const theme = useSelector<RootState, string>(getTheme);

  const dispatch = useDispatch();
  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const title = theme ? 'Включить светлую тему' : 'Включить тёмную тему';

  return (
    <Button variant="icon" onClick={toggle} title={title} className="theme-toggle">
      <img src={themeToggleIcon} alt="Переключить тему" width="16px" height="16px" />
    </Button>
  );
};
