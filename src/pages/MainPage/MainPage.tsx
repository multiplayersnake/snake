import React, { FC } from 'react';

import Heading from '../../components/Heading';
import MainMenuItem from '../../components/MainMenuItem';
import { MenuAction } from '../../types/mainMenu';

import menuItems from './menuItems';

import './MainPage.css';

type MainPageProps = {
  authorized: boolean;
  onAction: (action: MenuAction) => void;
};

const MainPage: FC<MainPageProps> = ({ onAction, authorized }) => {
  return (
    <div className="main-page">
      <Heading tag="h1">Боевые змеи</Heading>
      <Heading tag="h2">Меню</Heading>

      <div className="main-page-menu">
        {menuItems.map((item) => (
          <MainMenuItem key={item.title} item={item} onAction={onAction} authorized={authorized} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;