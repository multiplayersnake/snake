import React, { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import './Button.css';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <button {...rest} className={cn('button', className)}>
      {children}
    </button>
  );
};

export default Button;
