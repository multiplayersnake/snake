import React, { FC } from 'react';

import { Heading } from '../../components';
import MainMenuItem from '../../components/MainPageComponents/MainMenuItem';
import InfoPanel from '../../components/MainPageComponents/InfoPanel';
import LeaderBoard from '../../components/MainPageComponents/LeaderBoard';
import { MenuAction } from '../../types';

import menuItems from './menuItems';

import './MainPage.css';

type MainPageProps = {
  onAction: (action: MenuAction) => void;
};

const MainPage: FC<MainPageProps> = ({ onAction }) => {
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

export default MainPage;
