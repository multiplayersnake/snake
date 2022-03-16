import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { checkAuthorization } from '../../store';

export function useAuth(): void {
  const dispatch = useDispatch();

  const { search } = useLocation();

  useEffect(() => {
    const parsed = new URLSearchParams(search);
    const code = parsed.get('code');

    dispatch(checkAuthorization(code));
  }, [dispatch, search]);
}
