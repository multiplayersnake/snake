import React, { FC, ButtonHTMLAttributes } from 'react';

import './Button.css';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { children, ...rest } = props;

  return (
    <button {...rest} className="button">
      {children}
    </button>
  );
};

export default Button;
