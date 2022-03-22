import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { toggleTheme } from '../../../store';
import { Button } from '../Button';

import './ThemeToggle.css';

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const toggle = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  const label = 'Включить тёмную тему';

  return <Button onClick={toggle}>{label}</Button>;
};
