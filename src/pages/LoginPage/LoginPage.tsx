import React, { FC, useCallback, useEffect } from 'react';

import Button from '../../components/Button';
import Form from '../../components/Form';
import Heading from '../../components/Heading';
import Input from '../../components/Input';

import AuthService from '../../services/AuthService';

import './LoginPage.css';

const LoginPage: FC = () => {
  useEffect(() => {
    void AuthService.checkAuthorization();
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    void AuthService.signIn(e);
  }, []);

  const handleLogout = useCallback(() => {
    void AuthService.logout();
  }, []);

  return (
    <div className="login-page">
      <Heading tag="h1">Боевые змеи</Heading>

      <Form onSubmit={handleSubmit}>
        <Heading tag="h2">Авторизация</Heading>

        <Input label="Логин" name="login" />
        <Input label="Пароль" name="password" type="password" />

        <div className="login-page-buttons">
          <Button type="submit">Войти</Button>
          <Button type="button" onClick={handleLogout}>
            Выйти
          </Button>
          {/*<Button type="button">Регистрация</Button>*/}
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
