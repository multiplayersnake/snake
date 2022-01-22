import React, { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { RootState } from '../../index';

import UserAPI from '../../api/UserAPI';
import './ProfilePage.css';
import NavButton from '../../components/Button/NavButton';
import Scroll from '../../components/Scroll/Scroll';
import coinSource from '../../assets/coin.png';
import awardSource from '../../assets/award.png';

import { part_arr } from '../../database/mock';
import { item_arr } from '../../database/mock';
import SelectorShopItemComponent from '../../components/SelectorShopItem';
import { User } from '../../types/models';
import { GameParameters } from '../../types/models';

import { showAlert } from '../../store/reducers/alert';
import { showConfirm } from '../../store/reducers/confirm';

const ProfilePage: FC = () => {
  // Игровые данные пользователя договорились пока хранить в поле second_name
  const userData: User = useSelector((state: RootState) => state['user']['item']);
  const userParameters: GameParameters = JSON.parse(userData.second_name);
  const user_selected = userParameters.parts;

  const [key, setKey] = useState(0);

  const dispatch = useDispatch();

  const saveSelectItem = useCallback(
    (partKey: number, ItemKey: number, isPurchased: boolean) => {
      const item = item_arr[partKey][ItemKey];
      if (isPurchased) userParameters.coins -= item.itemPrice;
      userParameters.parts[partKey] = ItemKey;
      userParameters.byItems[partKey].push(ItemKey);
      userData.second_name = JSON.stringify(userParameters);
      UserAPI.updateProfile(userData).then(() => {
        dispatch({ type: 'SET_USER_ITEM', item: userData });
      });
    },
    [dispatch, userData, userParameters]
  );

  const setSelectItem = useCallback(
    (partKey: number, ItemKey: number) => {
      if (userParameters.byItems[partKey].includes(ItemKey)) {
        saveSelectItem(partKey, ItemKey, true);
        setKey(key + 1);
      } else {
        const item = item_arr[partKey][ItemKey];
        if (item.itemPrice > userParameters.coins) {
          dispatch(showAlert('Недостаточно монет для покупки'));
          return;
        }
        if (item.itemCondition > userParameters.awards) {
          dispatch(showAlert('Недостаточно наград для покупки'));
          return;
        }
        dispatch(
          showConfirm(`Хотите купить "${item.name}" за "${item.itemPrice}"?`, () => {
            saveSelectItem(partKey, ItemKey, false);
            setKey(key + 1);
          })
        );
      }
    },
    [dispatch, key, saveSelectItem, userParameters.awards, userParameters.coins, userParameters.byItems]
  );

  return (
    <div className="profile-page">
      <NavButton className={cn('button', 'button-profile-back')} to={'/main'}>
        В меню
      </NavButton>
      <div className={cn('title-profile')}>
        <div className={cn('heading', 'h6')}>Позывной: {userData.first_name}</div>
        <div className={cn('heading', 'h6')}>
          Валюта: {userParameters.coins} <img src={coinSource} className={cn('img-in-line')} alt={'coin'} />
        </div>
        <div className={cn('heading', 'h6')}>
          Награды: {userParameters.awards} <img src={awardSource} className={cn('img-in-line')} alt={'award'} />
        </div>
      </div>
      <div className={cn('items-profile')}>
        <Scroll title={''} mode={'First'} id={'profile'}>
          {part_arr.map((value, index) => (
            <SelectorShopItemComponent
              key={index}
              title={value.name}
              selected={item_arr[index][user_selected[index]]}
              items={item_arr[index]}
              selectFunction={setSelectItem}
              partKey={index}
              purchasedItems={userParameters.byItems[index]}
            />
          ))}
        </Scroll>
      </div>
    </div>
  );
};

export default ProfilePage;
