import { GameUser } from '../../../types';

export function updateTheme(userData: GameUser, theme?: string): GameUser {
  const { gameParameters } = userData;

  const gameParametersUpdated = {
    ...gameParameters,
    theme
  };

  return { ...userData, gameParameters: gameParametersUpdated };
}
