import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getAuthorizationChecked, getAuthorized, RootState } from '../../../store';

const GUEST_DEFAULT_ROUTE = '/login';

export const AuthorizedOnly: FC = ({ children }) => {
  const authorizationChecked = useSelector<RootState, boolean>(getAuthorizationChecked);
  const authorized = useSelector<RootState, boolean>(getAuthorized);

  if (!authorizationChecked) {
    return null;
  }

  if (!authorized) {
    return <Redirect to={GUEST_DEFAULT_ROUTE} />;
  }

  return <>{children}</>;
};
