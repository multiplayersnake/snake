import React, { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import './Button.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = (props) => {
  const { type = 'button', children, className, ...rest } = props;

  return (
    <button {...rest} className={cn('button', className)} type={type}>
      {children}
    </button>
  );
};

export default Button;
