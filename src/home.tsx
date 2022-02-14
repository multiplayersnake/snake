import * as React from 'react';
import { useSelector } from 'react-redux';

import { SsrState } from './ssrStore/types';

const Home: React.FC = () => {
  const name = useSelector<SsrState, string>((state: SsrState) => state.main.name);

  return <div>Home page: {name}</div>;
};

export default Home;
