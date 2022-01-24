import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import './InfoPanel.css';
import coinSource from '../../../assets/coin.png';
import awardSource from '../../../assets/award.png';
import { GameParameters, User } from '../../../types/models';

const InfoPanel: FC = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userData: User = useSelector((state) => state['user']['item']);
  const userParameters: GameParameters = JSON.parse(userData.second_name);

  return (
    <div className={cn('panel', 'left-panel')}>
      <div className={cn('heading', 'h6')}>Позывной:</div>
      <div className={cn('heading', 'h6')}>{userData.first_name}</div>
      <div className={'flex-wrapper'} />
      <div>Валюта:</div>
      <div>
        {userParameters.coins} <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
      </div>
      <div className={'flex-wrapper'} />
      <div>Награды: </div>
      <div>
        {userParameters.awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
      </div>
    </div>
  );
};

export default InfoPanel;
