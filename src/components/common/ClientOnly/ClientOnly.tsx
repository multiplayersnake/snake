import React, { FC } from 'react';

import { isServer } from '../../../utils';

export const ClientOnly: FC = ({ children }) => {
  if (isServer) return null;

  return <>{children}</>;
};
