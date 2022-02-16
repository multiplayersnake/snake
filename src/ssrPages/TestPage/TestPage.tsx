import React, { FC } from 'react';

import { Heading } from '../../ssrComponents';
import { Button } from '../../components/common/Button';

import './TestPage.css';

type TestPageProps = {
  text?: string;
};

export const TestPage: FC<TestPageProps> = (props) => {
  return (
    <div className="test-page">
      <Heading tag="h1" className="test-title">
        {props.text ?? 'Тестовая страница'}
      </Heading>

      <Button>Click</Button>

      <p>Здесь будет контент</p>
    </div>
  );
};
