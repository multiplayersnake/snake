import { SsrState } from '../../types';

export function getEndGameCoins(state: SsrState): number {
  return state.endGame.coins;
}

export function getEndGameTime(state: SsrState): string {
  return state.endGame.time;
}

export function getEndGameAwards(state: SsrState): number {
  return state.endGame.awards;
}

export function getEndGamePlace(state: SsrState): number {
  return state.endGame.place;
}

export function getIsGameOver(state: SsrState): boolean {
  return Boolean(state.endGame.isGameOver);
}
