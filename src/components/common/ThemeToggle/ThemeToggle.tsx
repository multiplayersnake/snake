import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleTheme } from '../../../store';
import { useTheme } from '../../../hooks';
import { Button } from '../Button';

import themeToggleIcon from '../../../assets/images/themeToggle.png';

import './ThemeToggle.css';

export const ThemeToggle = () => {
  const [key, setKey] = useState(null);
  const theme = useTheme();

  const dispatch = useDispatch();
  const toggle = useCallback(() => {
    dispatch(toggleTheme());
    setKey(Date.now());
  }, [dispatch]);

  const title = theme ? 'Включить светлую тему' : 'Включить тёмную тему';

  return (
    <Button variant="icon" onClick={toggle} title={title} className="theme-toggle" key={key}>
      <img src={themeToggleIcon} alt="Переключить тему" width="16px" height="16px" />
    </Button>
  );
};
