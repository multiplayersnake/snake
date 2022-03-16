import { FormEvent } from 'react';
import { Dispatch } from 'redux';

import OAuthService from '../../../services/OAuthService';
import AuthService from '../../../services/AuthService';

import { item_arr } from '../../../database/mock';

import { GameParameters, GameUser } from '../../../types';
import { GetState } from '../../types';
import { UserActionType, UserAction } from './types';

import { externalUserAPI, mapToRawUser } from '../../../api';
import { showModal } from '../modal';
import { getUser, getUserGameParameters } from './';

export function setUser(user: GameUser): UserAction {
  return { type: UserActionType.SetUser, payload: user };
}

export function saveGameResults(update: Partial<GameParameters>): UserAction {
  return { type: UserActionType.SaveGameResults, payload: update };
}

export function checkAuthorization(code?: string) {
  return async function checkAuthorizationThunk(dispatch: Dispatch) {
    if (code) {
      await OAuthService.sendCode(code);
    }

    const gameUser = await AuthService.checkAuthorization();

    dispatch(setUser(gameUser));
  };
}

export function logIn(e: FormEvent) {
  return async function logInThunk(dispatch: Dispatch) {
    await AuthService.signIn(e);

    const gameUser = await AuthService.checkAuthorization();

    dispatch(setUser(gameUser));

    const form = e.target as HTMLFormElement;
    form.reset();
  };
}

export function signUp(e: FormEvent) {
  return async function signUpThunk(dispatch: Dispatch) {
    await AuthService.signUp(e);

    const gameUser = await AuthService.checkAuthorization();

    dispatch(setUser(gameUser));

    const form = e.target as HTMLFormElement;
    form.reset();
  };
}

export function logOut() {
  return async function logOutThunk(dispatch: Dispatch) {
    await AuthService.logOut();
    dispatch(setUser(null));
  };
}

// TODO эту функцию можно вынести в utils, а item_arr лучше передавать как параметр, можно это сделать когда (если ?) избавимся от мока в пользу хранения в базе данных

function updateUserData(userData: GameUser, partKey: number, itemKey: number, isPurchased: boolean): GameUser {
  const { gameParameters } = userData;

  const item = item_arr[partKey][itemKey];

  const coinsUpdated = isPurchased ? gameParameters.coins : gameParameters.coins - item.itemPrice;
  const partsUpdated = [...gameParameters.parts];
  partsUpdated[partKey] = itemKey;

  const byItemsUpdated = [...gameParameters.byItems];
  byItemsUpdated[partKey] = [...byItemsUpdated[partKey], itemKey];

  const gameParametersUpdated = {
    ...gameParameters,
    coins: coinsUpdated,
    parts: partsUpdated,
    byItems: byItemsUpdated
  };

  return { ...userData, gameParameters: gameParametersUpdated };
}

export function selectCustomBodyPart(partKey: number, itemKey: number) {
  return async function selectCustomBodyPartThunk(dispatch: Dispatch, getState: GetState) {
    const state = getState();
    const userData = getUser(state);
    const gameParameters = getUserGameParameters(state);

    const isPurchased = gameParameters.byItems[partKey].includes(itemKey);

    if (isPurchased) {
      const userDataUpdated = updateUserData(userData, partKey, itemKey, true);
      const rawUser = mapToRawUser(userDataUpdated);
      await externalUserAPI.updateProfile(rawUser);

      dispatch(setUser(userDataUpdated));

      return;
    }

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
      showModal(`Хотите купить "${item.name}" за "${item.itemPrice}"?`, async () => {
        // TODO дублирующийся код, кажется это можно вынести в ExternalUserService
        const userDataUpdated = updateUserData(userData, partKey, itemKey, false);
        const rawUser = mapToRawUser(userDataUpdated);
        await externalUserAPI.updateProfile(rawUser);

        dispatch(setUser(userDataUpdated));
      })
    );
  };
}
