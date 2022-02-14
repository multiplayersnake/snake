import * as React from 'react';
import { useSelector } from 'react-redux';

import { SsrState } from '../ssrStore/types';
import { isServer } from '../ssrStore/rootStore';

const Home: React.FC = () => {
  const ssrTestDate = useSelector<SsrState, SsrState['ssrTestData']>((state: SsrState) => state.ssrTestData);

  return (
    <div>
      <p>Компонент: Home</p>
      <p>Текущее время из стора: {ssrTestDate.time}</p>
      <p>Где эти данные записаны в стор: {ssrTestDate.isServer ? 'На сервере' : 'На клиенте'}</p>
      <p>Где отрендерена эта страница: {isServer ? 'На сервере' : 'На клиенте'}</p>
    </div>
  );
};

export default Home;
