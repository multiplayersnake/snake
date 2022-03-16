import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { RootState, getUserNickname, getUserGameParameters, selectCustomBodyPart } from '../../store';
import { NavButton, Scroll, SelectorShopItem } from '../../components';

import coinSource from '../../assets/images/coin.png';
import awardSource from '../../assets/images/award.png';

import { part_arr } from '../../database/mock';
import { item_arr } from '../../database/mock';

import { GameParameters } from '../../types';

import './ProfilePage.css';

export const ProfilePage: FC = () => {
  const nickname = useSelector<RootState, string>(getUserNickname);
  const gameParameters = useSelector<RootState, GameParameters>(getUserGameParameters);

  const dispatch = useDispatch();

  const setSelectItem = useCallback(
    (partKey: number, itemKey: number) => {
      dispatch(selectCustomBodyPart(partKey, itemKey));
    },
    [dispatch]
  );

  return (
    <div className="profile-page">
      <NavButton className={cn('button', 'button-profile-back')} to={'/main'}>
        В меню
      </NavButton>

      <div className={cn('title-profile')}>
        <div className={cn('heading', 'h6')}>Позывной: {nickname}</div>
        <div className={cn('heading', 'h6')}>
          Валюта: {gameParameters?.coins} <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
        </div>

        <div className={cn('heading', 'h6')}>
          Награды: {gameParameters?.awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
        </div>
      </div>

      <div className={cn('items-profile')}>
        <Scroll title={''} mode={'First'} id={'profile'}>
          {part_arr.map((value, index) => (
            <SelectorShopItem
              key={index}
              title={value.name}
              selected={item_arr[index][gameParameters?.parts[index]]}
              items={item_arr[index]}
              selectFunction={setSelectItem}
              partKey={index}
              purchasedItems={gameParameters?.byItems[index]}
            />
          ))}
        </Scroll>
      </div>
    </div>
  );
};
