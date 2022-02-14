import * as React from 'react';
import { useSelector } from 'react-redux';

import { SsrState } from '../ssrStore/types';

const Root: React.FC = () => {
  const name = useSelector<SsrState, string>((state: SsrState) => state.main.name);

  return <div>Root page: {name}</div>;
};

export default Root;
