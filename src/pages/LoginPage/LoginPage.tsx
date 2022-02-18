import React, { FC, FormEvent, useCallback, useEffect } from 'react';

import { Button, NavButton, Input, Form, Heading } from '../../components';
import { MenuAction, MenuActionType } from '../../types';
import { useLocation } from 'react-router-dom';
import './LoginPage.css';
import AuthService from '../../services/AuthService';


type LoginPageProps = {
  onAction: (action: MenuAction) => void;
};

export const LoginPage: FC<LoginPageProps> = ({ onAction }) => {
  const { search } = useLocation();
  const parsed = new URLSearchParams(search);
  const code = parsed.get('code');

  useEffect(() => {
    console.log('aasdf')
    if (code) {
      console.log(code)
      //void AuthService.sendOauthCode(code);
      //void AuthService.checkAuthorization();
    }
  }, [code]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      onAction({ type: MenuActionType.Login, payload: e });

      const form = e.target as HTMLFormElement;
      form.reset()
    },
    [onAction]
  );

  const yandexClick = useCallback(
    async (e: FormEvent) => {
      onAction({ type: MenuActionType.LoginOauth, payload: e });
    },
    [onAction]
  );

  return (
    <div className="login-page">
      <Heading tag="h1" className="login-title">
        Боевые змеи
      </Heading>

      <Form onSubmit={handleSubmit} name={'yyy'} id={'yyy'}>
        <Heading tag="h2">Авторизация</Heading>

        <Input required label="Логин" name="login" />
        <Input required label="Пароль" name="password" type="password" />

        <div>
          <Button className="registration-button" type="submit">
            Войти
          </Button>
          <NavButton className="registration-button" to="/signup">
            Регистрация
          </NavButton>
          <Button onClick={yandexClick} className="registration-button">
            Войти через Yandex
          </Button>
        </div>
      </Form>
    </div>
  );
};
