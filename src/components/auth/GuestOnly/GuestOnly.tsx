import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getAuthorizationChecked, getAuthorized, RootState } from '../../../store';

const AUTHORIZED_DEFAULT_ROUTE = '/';

export const GuestOnly: FC = ({ children }) => {
  const authorizationChecked = useSelector<RootState, boolean>(getAuthorizationChecked);
  const authorized = useSelector<RootState, boolean>(getAuthorized);

  if (!authorizationChecked) {
    return null;
  }

  if (authorized) {
    return <Redirect to={AUTHORIZED_DEFAULT_ROUTE} />;
  }

  return <>{children}</>;
};
