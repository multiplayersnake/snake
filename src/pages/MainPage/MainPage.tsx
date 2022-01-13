import React, { FC } from 'react';
import cn from 'classnames';

import Heading from '../../components/Heading';
import MainMenuItem from '../../components/MainMenuItem';
import { MenuAction } from '../../types/mainMenu';
import coinSource from '../../assets/coin.png';
import awardSource from '../../assets/award.png';

import menuItems from './menuItems';

import './MainPage.css';
import { leaderList } from './mock';

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
      <div className={cn('panel', 'left-panel')}>
        <div className={cn('heading', 'h6')}>Позывной:</div>
        <div className={cn('heading', 'h6')}>John</div>
        <div className={'flex-wrapper'} />
        <div>Валюта:</div>
        <div>
          150 <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
        </div>
        <div className={'flex-wrapper'} />
        <div>Награды: </div>
        <div>
          7 <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
        </div>
      </div>
      <div className={cn('panel', 'right-panel')}>
        <div className={cn('heading', 'h6')}>Лучшие из лучших:</div>
        {leaderList.map((item) => (
          <div key={item.nick} className={'leader-item'}>
            <div> {item.nick} </div>
            <div>
              {item.awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
