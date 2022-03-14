import React, { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import './ImgButton.css';

type ImgButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const ImgButton: FC<ImgButtonProps> = (props) => {
  const { type = 'button', children, className, ...rest } = props;

  return (
    <button {...rest} className={cn('imgButton', className)} type={type}>
      {children}
    </button>
  );
};

export default ImgButton;
