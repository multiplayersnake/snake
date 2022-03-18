import React, { FC } from 'react';
import cn from 'classnames';
import './GameLevel.css';
import { NavButton } from '../../common';

import level0Source from '../../../assets/images/level_0.png';
import level1Source from '../../../assets/images/level_1.png';
import level2Source from '../../../assets/images/level_2.png';
import level3Source from '../../../assets/images/level_3.png';
const imgLevelSources = [level0Source, level1Source, level2Source, level3Source];

type GameLevelProps = {
  title: string;
  description: string;
  level: number;
  imgFloat: 'left' | 'right';
};

export const GameLevel: FC<GameLevelProps> = (props) => {
  const { title, description, level, imgFloat } = props;

  return (
    <div className={'game-type'}>
      <div className={cn('heading', 'h6')}>{title}</div>
      <div className={'game-type-desc'}>
        <img src={imgLevelSources[level]} alt={'level'} className={cn('game-type-img-' + imgFloat)} />
        {description}
      </div>
      <NavButton className={cn('button')} to={'/game'} data={{ store: 'level', value: level }}>
        Начать
      </NavButton>
    </div>
  );
};
