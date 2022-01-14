import React, { FC } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import './InfoPanel.css';
import coinSource from '../../../assets/coin.png';
import awardSource from '../../../assets/award.png';
import { User } from '../../../types/models';

type InfoPanelProps = {
  nick: string;
  coins: number;
  awards: number;
};

const InfoPanel: FC<InfoPanelProps> = (props) => {
  const { awards } = props;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const userData: User = useSelector((state) => state['user']['item']);
  console.log(userData);

  return (
    <div className={cn('panel', 'left-panel')}>
      <div className={cn('heading', 'h6')}>Позывной:</div>
      <div className={cn('heading', 'h6')}>{userData.display_name}</div>
      <div className={'flex-wrapper'} />
      <div>Валюта:</div>
      <div>
        {userData.login} <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
      </div>
      <div className={'flex-wrapper'} />
      <div>Награды: </div>
      <div>
        {awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
      </div>
    </div>
  );
};

export default InfoPanel;
