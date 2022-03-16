import React from 'react';

import { Heading, MainMenuItem, InfoPanel, LeaderBoard } from '../../components';

import menuItems from './menuItems';

import './MainPage.css';

export const MainPage = () => {
  return (
    <div className="main-page">
      <Heading tag="h1">Боевые змеи</Heading>
      <Heading tag="h2">Меню</Heading>

      <div className="main-page-menu">
        {menuItems.map((item) => (
          <MainMenuItem key={item.title} item={item} />
        ))}
      </div>
      <InfoPanel />
      <LeaderBoard />
    </div>
  );
};
