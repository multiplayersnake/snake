import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { NavButton } from '../../components';

import coinSource from '../../assets/images/coin.png';
import awardSource from '../../assets/images/award.png';

import level0Source from '../../assets/images/level_0.png';
import level1Source from '../../assets/images/level_1.png';
import level2Source from '../../assets/images/level_2.png';
import level3Source from '../../assets/images/level_3.png';

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
            <img src={level0Source} alt={'level0'} style={{ float: 'left' }} />В этом режиме невозможно проиграть,
            однако и зарабатывать награды и монеты в нем также невозможно. Вы можете только оттачивать навыки.
          </div>
          <NavButton className={cn('button')} to={'/game'} data={{ store: 'level', value: 0 }}>
            Начать
          </NavButton>
        </div>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>Лёгкий уровень</div>
          <div className={'game-type-desc'}>
            <img src={level1Source} alt={'level1'} style={{ float: 'right' }} />В этом режиме игра идет всего одну
            минуту и вы двигаетесь не слишком быстро. Удары о стены наносят лёгкий урон, а яблоки восстанавливают много
            жизни. На этом уровне можно заработать немного монет, и за его прохождение можно получить 1 кубок.
          </div>
          <NavButton className={cn('button')} to={'/game'} data={{ store: 'level', value: 1 }}>
            Начать
          </NavButton>
        </div>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>Нормальный уровень</div>
          <div className={'game-type-desc'}>
            <img src={level2Source} alt={'level1'} style={{ float: 'left' }} />
            Игра на данном уровне нормализована по времени, скорости, ударам и лечению. За победу в этом уровне можно
            получить 5 кубков. На этом уровне нельзя сталкиваться с собой.
          </div>
          <NavButton className={cn('button')} to={'/game'} data={{ store: 'level', value: 2 }}>
            Начать
          </NavButton>
        </div>
        <div className={'game-type'}>
          <div className={cn('heading', 'h6')}>Экстремальный уровень</div>
          <div className={'game-type-desc'}>
            <img src={level3Source} alt={'level3'} style={{ float: 'right' }} />
            Данный уровень подойдет только тем, кто с легкостью проходит другие уровни. Скорость, удары значительно
            увеличены, лечение ослаблено. Зато и награда достойная - 20 кубков. На этом уровне нельзя сталкиваться с
            собой.
          </div>
          <NavButton className={cn('button')} to={'/game'} data={{ store: 'level', value: 3 }}>
            Начать
          </NavButton>
        </div>
      </div>
    </div>
  );
};
