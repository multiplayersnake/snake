import React, { FC } from 'react';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import './SignupPage.css';
import Heading from '../../components/Heading';
import Form from '../../components/Form';

const SignupPage: FC = () => {
  return (
    <div className="signup-page">
      <img className="logo" src={logo} alt={'logo'} />
      <Form>
        <Heading tag="h2">Регистрация</Heading>

        <Input label="Ник" name="nickname" />
        <Input label="E-mail" name="e-mail" />
        <Input label="Логин" name="login" />
        <Input label="Пароль" name="password" />

        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </div>
  );
};

export default SignupPage;
