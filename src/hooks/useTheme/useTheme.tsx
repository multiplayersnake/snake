import { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getTheme, getAuthorized, RootState, toggleTheme } from '../../store';
import { readTheme } from '../../utils';

type UseTheme = {
  theme?: string;
  toggle: () => void;
};

export function useTheme(): UseTheme {
  const [cachedTheme, setCachedTheme] = useState<string | undefined>(readTheme());
  const authorized = useSelector<RootState, boolean>(getAuthorized);
  const authorizedUserTheme = useSelector<RootState, string>(getTheme);

  const dispatch = useDispatch();
  const toggle = useCallback(() => {
    dispatch(toggleTheme());
    setCachedTheme(readTheme());
  }, [dispatch]);

  const theme = useMemo(
    () => (authorized ? authorizedUserTheme : cachedTheme),
    [authorized, authorizedUserTheme, cachedTheme]
  );

  return { theme, toggle };
}
