import { RootState } from '../../types';

export function getEndGameCoins(state: RootState): number {
  return state.endGame.coins;
}

export function getEndGameTime(state: RootState): string {
  return state.endGame.time;
}

export function getEndGameAwards(state: RootState): number {
  return state.endGame.awards;
}

export function getEndGamePlace(state: RootState): number {
  return state.endGame.place;
}

export function getIsGameOver(state: RootState): boolean {
  return Boolean(state.endGame.isGameOver);
}
