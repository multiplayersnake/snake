import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

// обратите внимание, как удобно указывать в одном импорте всё, что имеет отношение к redux
import { RootState, getUser, getUserNickname, getUserGameParameters, setUser, showModal } from '../../store';
import { NavButton, Scroll } from '../../components';

import UserAPI from '../../api/UserAPI';
import { mapToRawUser } from '../../api/AuthAPI';

import SelectorShopItemComponent from '../../components/ProfilePageComponents/SelectorShopItem';

import coinSource from '../../assets/coin.png';
import awardSource from '../../assets/award.png';

import { part_arr } from '../../database/mock';
import { item_arr } from '../../database/mock';

import { GameParameters, GameUser } from '../../types';

import './ProfilePage.css';

const ProfilePage: FC = () => {
  const userData = useSelector<RootState, GameUser>(getUser);
  const nickname = useSelector<RootState, string>(getUserNickname);
  const gameParameters = useSelector<RootState, GameParameters>(getUserGameParameters);

  const dispatch = useDispatch();

  const saveSelectItem = useCallback(
    (partKey: number, itemKey: number, isPurchased: boolean) => {
      const item = item_arr[partKey][itemKey];

      const coinsUpdated = !isPurchased ? gameParameters.coins - item.itemPrice : gameParameters.coins;
      const partsUpdated = [...gameParameters.parts];
      partsUpdated[partKey] = itemKey;

      gameParameters.byItems[partKey].push(itemKey);

      const gameParametersUpdated = { ...gameParameters, coins: coinsUpdated, parts: partsUpdated };
      const userDataUpdated = { ...userData, gameParameters: gameParametersUpdated };

      const rawUser = mapToRawUser(userDataUpdated);

      // TODO rework to async/await
      UserAPI.updateProfile(rawUser).then(() => {
        dispatch(setUser(userDataUpdated));
      });
    },
    [dispatch, gameParameters, userData]
  );

  const setSelectItem = useCallback(
    (partKey: number, itemKey: number) => {
      if (gameParameters.byItems[partKey].includes(itemKey)) {
        saveSelectItem(partKey, itemKey, true);
      } else {
        const item = item_arr[partKey][itemKey];

        if (item.itemPrice > gameParameters.coins) {
          dispatch(showModal('Недостаточно монет для покупки'));
          return;
        }

        if (item.itemCondition > gameParameters.awards) {
          dispatch(showModal('Недостаточно наград для покупки'));
          return;
        }

        dispatch(
          showModal(`Хотите купить "${item.name}" за "${item.itemPrice}"?`, () => {
            saveSelectItem(partKey, itemKey, false);
          })
        );
      }
    },
    [gameParameters.byItems, gameParameters.coins, gameParameters.awards, saveSelectItem, dispatch]
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
            <SelectorShopItemComponent
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

export default ProfilePage;
