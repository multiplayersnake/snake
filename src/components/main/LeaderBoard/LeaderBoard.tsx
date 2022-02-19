import React, { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { leaderBoardAPI } from '../../../api/LeaderBoardAPI';
import { LeaderItem } from '../../../api/LeaderBoardAPI';

import awardSource from '../../../assets/images/award.png';

import './LeaderBoard.css';

export const LeaderBoard: FC = () => {
  const [leaderList, setLeaderList] = useState([{ data: { user: '', awards: 0 } }] as LeaderItem[]);

  const getLeaderBoard = useCallback(() => {
    leaderBoardAPI.getLeaderList().then((result) => {
      setLeaderList(result as LeaderItem[]);
    });
  }, []);

  useEffect(() => {
    getLeaderBoard();
  }, [getLeaderBoard]);

  return (
    <div className={cn('panel', 'right-panel')}>
      <div className={cn('heading', 'h6')}>Лучшие из лучших:</div>
      {leaderList.map((item, index) => (
        <div key={index} className={'leader-item'}>
          <div> {item.data.user} </div>
          <div>
            {item.data.awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
          </div>
        </div>
      ))}
    </div>
  );
};
