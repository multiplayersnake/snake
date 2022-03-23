import React, { FormEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { logIn } from '../../store';
import OAuthService from '../../services/OAuthService';
import { Button, NavButton, Input, Form, Heading, ThemeToggle } from '../../components/common';

import './LoginPage.css';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = useCallback(
    async (e: FormEvent) => {
      dispatch(logIn(e));
    },
    [dispatch]
  );

  const handleOAuthLogin = useCallback(async () => {
    await OAuthService.signIn();
  }, []);

  return (
    <div className="login-page">
      <Heading tag="h1" className="login-title">
        Боевые змеи
      </Heading>

      <Form onSubmit={handleLogin}>
        <Heading tag="h2">Авторизация</Heading>

        <Input required label="Логин" name="login" />
        <Input required label="Пароль" name="password" type="password" />

        <div>
          <Button className="login-button" type="submit">
            Войти
          </Button>

          <NavButton className="login-button" to="/signup">
            Регистрация
          </NavButton>

          <Button onClick={handleOAuthLogin} className="login-button">
            Войти через Яндекс
          </Button>
        </div>
      </Form>

      <div className="login-page-gap" />

      <ThemeToggle />
    </div>
  );
};
