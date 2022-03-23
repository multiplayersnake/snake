import { FormEvent } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import OAuthService from '../../../services/OAuthService';
import AuthService from '../../../services/AuthService';

import { item_arr } from '../../../database/mock';

import { GameParameters, GameUser } from '../../../types';
import { GetState, RootState } from '../../types';
import { UserActionType, UserAction } from './types';

import { externalUserAPI, mapToRawUser } from '../../../api';
import { setDocumentTheme, applyCachedTheme, cacheTheme, readTheme } from '../../../utils';
import { showModal } from '../modal';
import { updateTheme } from './utils';
import { getUser, getUserGameParameters, getTheme, getAuthorized } from './';

export function toggleTheme() {
  return async function toggleThemeThunk(dispatch: ThunkDispatch<RootState, void, AnyAction>, getState: GetState) {
    const state = getState();
    const authorized = getAuthorized(state);

    if (!authorized) {
      const cachedTheme = readTheme();
      const newTheme = cachedTheme ? undefined : 'dark';

      setDocumentTheme(newTheme);
      cacheTheme(newTheme);

      return;
    }

    const theme = getTheme(state);
    const newTheme = theme ? undefined : 'dark';

    setDocumentTheme(newTheme);
    cacheTheme(newTheme);

    const userData = getUser(state);
    const userDataUpdated = updateTheme(userData, newTheme);

    // TODO add updateUser action ?
    const rawUser = mapToRawUser(userDataUpdated);
    await externalUserAPI.updateProfile(rawUser);

    await dispatch(setUser(userDataUpdated));
  };
}

export function setUser(user: GameUser | null): UserAction {
  return { type: UserActionType.SetUser, payload: user };
}

export function saveGameResults(update: Partial<GameParameters>): UserAction {
  return { type: UserActionType.SetGameResults, payload: update };
}

export function checkAuthorization(code?: string) {
  return async function checkAuthorizationThunk(dispatch: ThunkDispatch<RootState, void, AnyAction>) {
    applyCachedTheme();

    if (code) {
      await OAuthService.sendCode(code);
    }

    const gameUser = await AuthService.checkAuthorization();

    dispatch(setUser(gameUser));

    if (!gameUser) return;

    const { theme } = gameUser.gameParameters;
    setDocumentTheme(theme);
    cacheTheme(theme);
  };
}

export function logIn(e: FormEvent) {
  return async function logInThunk(dispatch: Dispatch) {
    await AuthService.signIn(e);

    const gameUser = await AuthService.checkAuthorization();

    dispatch(setUser(gameUser));

    const form = e.target as HTMLFormElement;
    form.reset();

    if (!gameUser) return;

    const { theme } = gameUser.gameParameters;
    setDocumentTheme(theme);
    cacheTheme(theme);
  };
}

export function signUp(e: FormEvent) {
  return async function signUpThunk(dispatch: Dispatch) {
    await AuthService.signUp(e);

    const gameUser = await AuthService.checkAuthorization();

    dispatch(setUser(gameUser));

    const form = e.target as HTMLFormElement;
    form.reset();

    if (!gameUser) return;

    // TODO сделать thunk ?
    const { theme } = gameUser.gameParameters;
    setDocumentTheme(theme);
    cacheTheme(theme);
  };
}

export function logOut() {
  return async function logOutThunk(dispatch: Dispatch) {
    await AuthService.logOut();
    dispatch(setUser(null));
  };
}

// TODO эту функцию можно вынести в utils, а item_arr лучше передавать как параметр, можно это сделать когда (если ?) избавимся от мока в пользу хранения в базе данных
function updateBodyParts(userData: GameUser, partKey: number, itemKey: number, isPurchased: boolean): GameUser {
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
      const userDataUpdated = updateBodyParts(userData, partKey, itemKey, true);
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
        const userDataUpdated = updateBodyParts(userData, partKey, itemKey, false);
        const rawUser = mapToRawUser(userDataUpdated);
        await externalUserAPI.updateProfile(rawUser);

        dispatch(setUser(userDataUpdated));
      })
    );
  };
}
