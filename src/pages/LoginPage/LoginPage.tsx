import React, { FC } from 'react';

import Button from '../../components/Button';
import Form from '../../components/Form';
import Heading from '../../components/Heading';
import Input from '../../components/Input';

import './LoginPage.css';

const LoginPage: FC = () => {
  return (
    <div className="login-page">
      <Heading tag="h1">Боевые змеи</Heading>

      <Form>
        <Heading tag="h2">Авторизация</Heading>

        <Input label="Логин" name="login" />
        <Input label="Пароль" name="password" type="password" />

        <div className="login-page-buttons">
          <Button type="submit">Войти</Button>
          <Button type="button">Регистрация</Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
