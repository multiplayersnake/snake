import { BaseAction } from '../../types';

export type EndGameState = {
  time: string;
  place: number;
  coins: number;
  awards: number;
  isVisible: boolean;
};

export enum EndGameActionType {
  ShowEndGame = 'ShowEndGame',
  HideEndGame = 'HideEndGame'
}

export interface EndGameAction extends BaseAction<EndGameActionType> {
  payload?: Omit<EndGameState, 'isVisible'>;
}
