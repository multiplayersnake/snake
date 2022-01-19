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

        <Input required label="Ник" name="nickname" />
        <Input required label="E-mail" name="e-mail" />
        <Input required label="Логин" name="login" />
        <Input required label="Пароль" name="password" />

        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </div>
  );
};

export default SignupPage;
