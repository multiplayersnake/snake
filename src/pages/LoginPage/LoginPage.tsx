import React, { FC } from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';

import yellowSquare from '../../assets/yellow-square.jpg';
import './LoginPage.css';

const LoginPage: FC = () => {
  return (
    <div className="login-page">
      <h1>Здесь будет страница авторизации...</h1>

      <Input label="Логин" id="login" name="login" />

      <Input label="Пароль" id="password" name="password" type="password" />

      <TextArea label="Биография" id="bio" name="bio" />

      <Button>Авторизоваться</Button>

      <img className="login-page-image" src={yellowSquare} alt="Yellow square" title="Красный круг" />
    </div>
  );
};

export default LoginPage;
