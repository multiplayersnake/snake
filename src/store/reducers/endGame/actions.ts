import { EndGameActionType, EndGameAction } from './types';

// Примечание: есть идея, что имена экшен криэйторы, которые вызываются из компонентов,
// могли бы обозначать скорее логические действия в приложении,
// например resetGame() или finishGame(), а внутри себя они могут вызывать несколько других действий,
// т.е. что нужно показать, куда перенаправить юзера записано в экшенкриэйтере, важно, что логически нам нужно "Закончить игру"

export function showEndGame(time: string, place: number, coins: number, awards: number): EndGameAction {
  return {
    type: EndGameActionType.ShowEndGame,
    payload: {
      time,
      place,
      coins,
      awards
    }
  };
}

export function hideEndGame(): EndGameAction {
  return { type: EndGameActionType.HideEndGame };
}
