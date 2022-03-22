import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTheme, RootState, toggleTheme } from '../../../store';
import { Button } from '../Button';

import './ThemeToggle.css';

export const ThemeToggle = () => {
  const theme = useSelector<RootState, string>(getTheme);

  const dispatch = useDispatch();
  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const label = theme ? 'Включить светлую тему' : 'Включить тёмную тему';

  return <Button onClick={toggle}>{label}</Button>;
};
