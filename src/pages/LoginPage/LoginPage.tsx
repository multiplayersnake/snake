import React, { FC, useCallback } from 'react';

import Button from '../../components/Button';
import NavButton from '../../components/Button/NavButton';
import Form from '../../components/Form';
import Heading from '../../components/Heading';
import Input from '../../components/Input';

import AuthService from '../../services/AuthService';
import { User } from '../../types/models';

import './LoginPage.css';

type LoginPageProps = {
  onLogin: (user?: User) => void;
};

const LoginPage: FC<LoginPageProps> = ({ onLogin }) => {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function login() {
        await AuthService.signIn(e);
        const user = await AuthService.checkAuthorization();
        onLogin(user);

        const form = e.target as HTMLFormElement;
        form.reset();
      }

      void login();
    },
    [onLogin]
  );

  return (
    <div className="login-page">
      <Heading tag="h1">Боевые змеи</Heading>

      <Form onSubmit={handleSubmit}>
        <Heading tag="h2">Авторизация</Heading>

        <Input label="Логин" name="login" />
        <Input label="Пароль" name="password" type="password" />

        <div className="login-page-buttons">
          <Button type="submit">Войти</Button>
          <NavButton to="/signup">Регистрация</NavButton>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
