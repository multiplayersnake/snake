import React, { FC, FormHTMLAttributes, FormEvent, useCallback } from 'react';
import cn from 'classnames';

import './Form.css';

const Form: FC<FormHTMLAttributes<HTMLFormElement>> = (props) => {
  const { className, children, ...rest } = props;

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      props.onSubmit?.(e);
    },
    [props]
  );

  return (
    <form {...rest} className={cn('form', className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
