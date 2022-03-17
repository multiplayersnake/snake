import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLeaderboard, getLeaderboardItems, RootState } from '../../../store';
import { LeaderboardItem } from '../../../types';
import { Heading } from '../../common';

import awardSource from '../../../assets/images/award.png';

import './Leaderboard.css';

export const Leaderboard: FC = () => {
  const dispatch = useDispatch();

  const items = useSelector<RootState, LeaderboardItem[]>(getLeaderboardItems);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <div className="panel right-panel">
      <Heading tag="h6">Лучшие из лучших:</Heading>

      {items.map((item, index) => (
        <div key={index} className="leader-item">
          {item.data.user}
          <div>
            {item.data.awards} <img src={awardSource} className="img-in-line" alt="award" />
          </div>
        </div>
      ))}
    </div>
  );
};
