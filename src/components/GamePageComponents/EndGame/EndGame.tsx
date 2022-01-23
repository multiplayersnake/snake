import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';

import { RootState } from '../../../index';
import NavButton from '../../Button/NavButton';

import './EndGame.css';
import Heading from '../../Heading';
import coinSource from '../../../assets/coin.png';
import awardSource from '../../../assets/award.png';

const EndGame: FC = () => {
  const time: string = useSelector((state: RootState) => state['endGame']['time']);
  const place: number = useSelector((state: RootState) => state['endGame']['place']);
  const coins: number = useSelector((state: RootState) => state['endGame']['coins']);
  const awards: number = useSelector((state: RootState) => state['endGame']['awards']);
  const isVisible: boolean = useSelector((state: RootState) => state['endGame']['isVisible']);

  const visibilityClass = isVisible ? 'show' : 'hide';
  return (
    <div className={cn('end-game', visibilityClass)}>
      <Heading tag="h1" className={cn('title-forum')}>
        Игра окончена
      </Heading>
      <Heading tag="h2">Ваши результаты</Heading>
      <div className={cn('heading', 'h6')}>Вы заняли {place} место</div>
      <div className={cn('heading', 'h6')}>Время игры: {time}</div>
      <div className={cn('heading', 'h6')}>
        Заработано валюты: {coins} <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
      </div>
      <div className={cn('heading', 'h6')}>
        Получено наград: {awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
      </div>
      <NavButton className={cn('button')} to={'/main'}>
        ОК
      </NavButton>
    </div>
  );
};

export default EndGame;
