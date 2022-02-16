import React, { FC } from 'react';

import { Heading } from '../../ssrComponents';
import { Button } from '../../components/common/Button';

import './TestPage.css';

export const TestPage: FC = () => {
  return (
    <div className="test-page">
      <Heading tag="h1" className="test-title">
        Тестовая страница
      </Heading>

      <Button>Зарегистрироваться</Button>

      <div>Здесь будет контент</div>
    </div>
  );
};
