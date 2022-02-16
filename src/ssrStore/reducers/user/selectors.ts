import { GameParameters, GameUser } from '../../../types';
import { SsrState } from '../../types';

export function getUser(state: SsrState): GameUser {
  return state.user.data;
}

export function getUserNickname(state: SsrState): string {
  return state.user.data?.nickname;
}

export function getUserGameParameters(state: SsrState): GameParameters {
  return state.user.data?.gameParameters;
}

export function getAuthorized(state: SsrState): boolean {
  return Boolean(state.user.data);
}

export function getAuthorizationChecked(state: SsrState): boolean {
  return typeof state.user.data !== 'undefined';
}
