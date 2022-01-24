import React, { FC, FormEvent, useCallback } from 'react';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import NavButton from '../../components/Button/NavButton';
import Form from '../../components/Form';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import { MenuAction, MenuActionType } from '../../types/mainMenu';

import './LoginPage.css';

type LoginPageProps = {
  onAction: (action: MenuAction) => void;
};

const LoginPage: FC<LoginPageProps> = ({ onAction }) => {
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      onAction({ type: MenuActionType.Login, payload: e });

      const form = e.target as HTMLFormElement;
      form.reset();
    },
    [onAction]
  );

  return (
    <div className="login-page">
      <Heading tag="h1">Боевые змеи</Heading>

      <Form onSubmit={handleSubmit}>
        <Heading tag="h2">Авторизация</Heading>

        <Input label="Логин" name="login" />
        <Input label="Пароль" name="password" type="password" />

        <div>
          <Button className="button-registration" type="submit">Войти</Button>
          <NavButton className="button-registration" to="/signup">Регистрация</NavButton>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
