import React, { FC, FormHTMLAttributes } from 'react';
import cn from 'classnames';

import './Form.css';

const Form: FC<FormHTMLAttributes<HTMLFormElement>> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <form {...rest} className={cn('form', className)}>
      {children}
    </form>
  );
};

export default Form;
