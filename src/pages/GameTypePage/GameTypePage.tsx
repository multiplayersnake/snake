import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { NavButton } from '../../components';

import coinSource from '../../assets/images/coin.png';
import awardSource from '../../assets/images/award.png';

import { GameParameters } from '../../types';
import { RootState, getUserGameParameters, getUserNickname } from '../../store';

import './GameTypePage.css';
import mscMain from '../../assets/sound/main.mp3';

export const GameTypePage: FC = () => {
  const nickname = useSelector<RootState, string>(getUserNickname);
  const userParameters = useSelector<RootState, GameParameters>(getUserGameParameters);

  return (
    <div className="game-type-page">
      <audio id={'mainMusic'} src={mscMain} autoPlay={true} preload={'auto'} loop={true} />
      <NavButton className={cn('button', 'button-game-type-back')} to={'/main'}>
        В меню
      </NavButton>
      <div className={cn('title-game-type')}>
        <div className={cn('heading', 'h6')}>Позывной: {nickname}</div>
        <div className={cn('heading', 'h6')}>
          Валюта: {userParameters?.coins} <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
        </div>
        <div className={cn('heading', 'h6')}>
          Награды: {userParameters?.awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
        </div>
      </div>
      <div className={cn('menu-game-type')}>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>Тренировка</div>
          <div className={'game-type-desc'}>
            Это режим одиночной игры. В этом режиме вы можете зарабатывать валюту, однако не будете получать наград.
          </div>
          <NavButton className={cn('button')} to={'/game'}>
            Начать
          </NavButton>
        </div>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>2 игрока</div>
          <div className={'game-type-desc'}>В разработке...</div>
          <div> </div>
        </div>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>3 игрока</div>
          <div className={'game-type-desc'}>В разработке...</div>
          <div> </div>
        </div>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>4 игрока</div>
          <div className={'game-type-desc'}>В разработке...</div>
          <div> </div>
        </div>
      </div>
    </div>
  );
};
