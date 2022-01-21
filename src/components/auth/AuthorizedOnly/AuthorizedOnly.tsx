import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getAuthorizationChecked, getAuthorized, RootState } from '../../../store';

const GUEST_DEFAULT_ROUTE = '/login';

// теперь AuthorizedOnly и GuestOnly - это просто компоненты,
// нужные данные они берут напрямую из redux

const AuthorizedOnly: FC = ({ children }) => {
  const authorizationChecked = useSelector<RootState, boolean>(getAuthorizationChecked);
  const authorized = useSelector<RootState, boolean>(getAuthorized);

  if (!authorizationChecked) {
    return null;
  }

  if (!authorized) {
    return <Navigate to={GUEST_DEFAULT_ROUTE} />;
  }

  return <>{children}</>;
};

export default AuthorizedOnly;
