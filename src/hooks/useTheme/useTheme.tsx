import { useSelector } from 'react-redux';

import { getTheme, getAuthorized, RootState } from '../../store';
import { readTheme } from '../../utils';

export function useTheme(): string | undefined {
  const authorized = useSelector<RootState, boolean>(getAuthorized);
  const theme = useSelector<RootState, string>(getTheme);

  if (authorized) {
    return theme;
  }

  return readTheme();
}
