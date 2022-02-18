import { GameParameters, GameUser } from '../../../types';
import { RootState } from '../../types';

export function getUser(state: RootState): GameUser {
  return state.user.data;
}

export function getUserNickname(state: RootState): string {
  return state.user.data?.nickname;
}

export function getUserGameParameters(state: RootState): GameParameters {
  return state.user.data?.gameParameters;
}

export function getAuthorized(state: RootState): boolean {
  return Boolean(state.user.data);
}

export function getAuthorizationChecked(state: RootState): boolean {
  return typeof state.user.data !== 'undefined';
}
