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
import { GameLevel } from '../../components/game/GameLevel';

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
      <div className={'menu-game-type'}>
        <GameLevel
          title={'Тренировка'}
          description={`В этом режиме невозможно проиграть,
            однако и зарабатывать награды и монеты в нем также невозможно. Вы можете только оттачивать навыки.`}
          level={0}
          imgFloat={'left'}
        />
        <GameLevel
          title={'Лёгкий уровень'}
          description={`В этом режиме игра идет всего одну
            минуту и вы двигаетесь не слишком быстро. Удары о стены наносят лёгкий урон, а яблоки восстанавливают много
            жизни. На этом уровне можно заработать немного монет, и за его прохождение можно получить 1 кубок.`}
          level={1}
          imgFloat={'right'}
        />
        <GameLevel
          title={'Нормальный уровень'}
          description={`Игра на данном уровне нормализована по времени, скорости, ударам и лечению. За победу в этом уровне можно
            получить 5 кубков. На этом уровне нельзя сталкиваться с собой.`}
          level={2}
          imgFloat={'left'}
        />
        <GameLevel
          title={'Экстремальный уровень'}
          description={`Данный уровень подойдет только тем, кто с легкостью проходит другие уровни. Скорость, удары значительно
        увеличены, лечение ослаблено. Зато и награда достойная - 20 кубков. На этом уровне нельзя сталкиваться с собой.`}
          level={3}
          imgFloat={'right'}
        />
      </div>
    </div>
  );
};
