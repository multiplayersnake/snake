import React from 'react';

import { useTheme } from '../../../hooks';
import { Button } from '../Button';

import themeToggleIcon from '../../../assets/images/themeToggle.png';

import './ThemeToggle.css';

export const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const title = theme ? 'Включить светлую тему' : 'Включить тёмную тему';

  return (
    <Button variant="icon" onClick={toggle} title={title} className="theme-toggle">
      <img src={themeToggleIcon} alt="Переключить тему" width="16px" height="16px" />
    </Button>
  );
};
