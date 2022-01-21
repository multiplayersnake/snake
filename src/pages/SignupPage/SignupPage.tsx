import React, { FC, FormEvent, useCallback } from 'react';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import { MenuAction, MenuActionType } from '../../types/mainMenu';

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
      <Heading tag="h1">Боевые змеи</Heading>
      <Form onSubmit={handleSubmit}>
        <Heading tag="h2">Регистрация</Heading>

        <Input required label="Логин" name="login" />
        <Input required label="Пароль" name="password" />
        <Input required label="Почта" name="email" />
        <Input required label="Позывной" name="first_name" />

        <Button className="button-registration" type="submit">Зарегистрироваться</Button>
      </Form>
    </div>
  );
};

export default SignupPage;
