import React, { FC } from 'react';

import Button from '../../components/Button';

import './LoginPage.css';

const LoginPage: FC = () => {
  return (
    <div className="login-page">
      <h1>Здесь будет страница авторизации...</h1>
      <Button>Авторизоваться</Button>
    </div>
  );
};

export default LoginPage;
