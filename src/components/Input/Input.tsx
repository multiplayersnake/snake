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
      <span className="input-label">{label}</span>
      <input {...rest} value={label} className={cn('input', className)} />
    </label>
  );
};

export default Input;
