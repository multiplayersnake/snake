import React, { FormEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { signUp } from '../../store';
import OAuthService from '../../services/OAuthService';
import { Button, NavButton, Input, Form, Heading, ThemeToggle } from '../../components/common';

import './SignupPage.css';

export const SignupPage = () => {
  const dispatch = useDispatch();

  const handleSignUp = useCallback(
    async (e: FormEvent) => {
      dispatch(signUp(e));
    },
    [dispatch]
  );

  const handleOAuthLogin = useCallback(async () => {
    await OAuthService.signIn();
  }, []);

  return (
    <div className="signup-page">
      <Heading tag="h1" className="signup-title">
        Боевые змеи
      </Heading>

      <Form onSubmit={handleSignUp}>
        <Heading tag="h2">Регистрация</Heading>

        <Input required label="Логин" name="login" autoComplete="new-password" />
        <Input required label="Пароль" name="password" type="password" autoComplete="new-password" />
        <Input required label="Почта" name="email" autoComplete="new-password" />
        <Input required label="Позывной" name="nickname" autoComplete="new-password" />

        <div>
          <Button className="signup-button" type="submit">
            Зарегистрироваться
          </Button>

          <NavButton className="signup-button" to="/login">
            Вход
          </NavButton>

          <Button onClick={handleOAuthLogin} className="signup-button">
            Войти через Яндекс
          </Button>
        </div>
      </Form>

      <div className="signup-page-gap" />

      <ThemeToggle />
    </div>
  );
};
