import React, { FC } from 'react';
import cn from 'classnames';

import './InfoPanel.css';
import coinSource from '../../../assets/coin.png';
import awardSource from '../../../assets/award.png';

type InfoPanelProps = {
  nick: string;
  coins: number;
  awards: number;
};

const InfoPanel: FC<InfoPanelProps> = (props) => {
  const { nick, coins, awards } = props;

  return (
    <div className={cn('panel', 'left-panel')}>
      <div className={cn('heading', 'h6')}>Позывной:</div>
      <div className={cn('heading', 'h6')}>{nick}</div>
      <div className={'flex-wrapper'} />
      <div>Валюта:</div>
      <div>
        {coins} <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
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
