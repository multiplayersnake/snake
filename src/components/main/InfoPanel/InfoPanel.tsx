import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import { GameParameters } from '../../../types';
import { getUserNickname, getUserGameParameters, RootState } from '../../../store';

import coinSource from '../../../assets/coin.png';
import awardSource from '../../../assets/award.png';

import './InfoPanel.css';

export const InfoPanel: FC = () => {
  const displayName = useSelector<RootState, string>(getUserNickname);
  const gameParameters = useSelector<RootState, GameParameters>(getUserGameParameters);

  return (
    <div className={cn('panel', 'left-panel')}>
      <div className={cn('heading', 'h6')}>Позывной:</div>
      <div className={cn('heading', 'h6')}>{displayName}</div>
      <div className={'flex-wrapper'} />
      <div>Валюта:</div>
      <div>
        {gameParameters?.coins} <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
      </div>
      <div className={'flex-wrapper'} />
      <div>Награды: </div>
      <div>
        {gameParameters?.awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
      </div>
    </div>
  );
};
