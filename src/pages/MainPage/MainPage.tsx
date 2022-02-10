import React, { FC } from 'react';

import { Heading, MainMenuItem, InfoPanel, LeaderBoard } from '../../components';
import { MenuAction } from '../../types';

import menuItems from './menuItems';

import './MainPage.css';

type MainPageProps = {
  onAction: (action: MenuAction) => void;
};

export const MainPage: FC<MainPageProps> = ({ onAction }) => {
  return (
    <div className="main-page">
      <Heading tag="h1">Боевые змеи</Heading>
      <Heading tag="h2">Меню</Heading>

      <div className="main-page-menu">
        {menuItems.map((item) => (
          <MainMenuItem key={item.title} item={item} onAction={onAction} />
        ))}
      </div>
      <InfoPanel />
      <LeaderBoard />
    </div>
  );
};
