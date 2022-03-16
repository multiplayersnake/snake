import { RootState } from '../../types';

export function getLevelValue(state: RootState): number {
  return state.level.value;
}
