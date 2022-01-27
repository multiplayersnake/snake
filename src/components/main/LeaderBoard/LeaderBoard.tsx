import React, { FC } from 'react';
import cn from 'classnames';

import awardSource from '../../../assets/award.png';

import { leaderList } from './mock';

import './LeaderBoard.css';

export const LeaderBoard: FC = () => {
  return (
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
  );
};
