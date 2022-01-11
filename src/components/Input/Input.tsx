import React, { FC, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import './Input.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input: FC<InputProps> = (props) => {
  const { label, className, ...rest } = props;

  return (
    <label className="input-container">
      <input {...rest} className={cn('input', className)} />
      <span className="input-label">{label}</span>
    </label>
  );
};

export default Input;
