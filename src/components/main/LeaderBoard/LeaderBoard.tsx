import React, { FC, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import HTTP from '../../../api/HTTP';

import awardSource from '../../../assets/award.png';

import './LeaderBoard.css';

type LeaderItem = {
  data: {
    user: string;
    awards: number;
  };
};

export const LeaderBoard: FC = () => {
  const [leaderList, setLeaderList] = useState([{ data: { user: '', awards: 0 } }] as LeaderItem[]);

  const getLeaderBoard = useCallback(() => {
    const http = new HTTP('/leaderboard/snake');
    http
      .post('', {
        data: {
          ratingFieldName: 'awards',
          cursor: 0,
          limit: 10
        }
      })
      .then((result) => {
        setLeaderList(result as LeaderItem[]);
        console.log(result);
      });
  }, []);

  useEffect(() => {
    getLeaderBoard();
  }, [getLeaderBoard]);

  return (
    <div className={cn('panel', 'right-panel')}>
      <div className={cn('heading', 'h6')}>Лучшие из лучших:</div>
      {leaderList.map((item) => (
        <div key={item.data.user} className={'leader-item'}>
          <div> {item.data.user} </div>
          <div>
            {item.data.awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
          </div>
        </div>
      ))}
    </div>
  );
};
