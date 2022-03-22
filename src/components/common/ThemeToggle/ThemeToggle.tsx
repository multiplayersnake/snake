import React, { FC } from 'react';

import { Button } from '../Button';

import './ThemeToggle.css';

export const ThemeToggle: FC = () => {
  const label = 'Включить тёмную тему';

  return <Button>{label}</Button>;
};
