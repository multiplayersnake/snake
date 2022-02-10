import React, { FC, AnchorHTMLAttributes, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import './Button.css';
import './NavButton.css';

type NavButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

export const NavButton: FC<NavButtonProps> = (props) => {
  const { to, children, className, ...rest } = props;
  const history = useHistory();
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      history.push(to);
    },
    [history, to]
  );

  return (
    <a {...rest} href={to} className={cn('button', 'nav-button', className)} onClick={handleClick}>
      {children}
    </a>
  );
};
