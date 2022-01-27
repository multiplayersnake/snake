import React, { FC, FormEvent, useCallback } from 'react';

import { Button, NavButton, Input, Form } from '../../components';
import Heading from '../../components/Heading';

import { MenuAction, MenuActionType } from '../../types';

import './SignupPage.css';

type SignUpPageProps = {
  onAction: (action: MenuAction) => void;
};

const SignupPage: FC<SignUpPageProps> = ({ onAction }) => {
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      onAction({ type: MenuActionType.SignUp, payload: e });

      const form = e.target as HTMLFormElement;
      form.reset();
    },
    [onAction]
  );

  return (
    <div className="signup-page">
      <Heading tag="h1" className="signup-title">
        Боевые змеи
      </Heading>

      <Form onSubmit={handleSubmit} className="signup-form">
        <Heading tag="h2">Регистрация</Heading>

        <Input required label="Логин" name="login" autoComplete="new-password" />
        <Input required label="Пароль" name="password" type="password" autoComplete="new-password" />
        <Input required label="Почта" name="email" autoComplete="new-password" />
        <Input required label="Позывной" name="nickname" autoComplete="new-password" />

        <div>
          <Button className="registration-button" type="submit">
            Зарегистрироваться
          </Button>
          <NavButton className="registration-button" to="/login">
            Вход
          </NavButton>
        </div>
      </Form>
    </div>
  );
};

export default SignupPage;
