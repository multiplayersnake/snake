import React, { FC, AnchorHTMLAttributes, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './Button.css';
import './NavButton.css';

type NavButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

export const NavButton: FC<NavButtonProps> = (props) => {
  const { to, children, className, ...rest } = props;
  const navigate = useNavigate();
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(to);
    },
    [navigate, to]
  );

  return (
    <a {...rest} href={to} className={cn('button', 'nav-button', className)} onClick={handleClick}>
      {children}
    </a>
  );
};

export default NavButton;
