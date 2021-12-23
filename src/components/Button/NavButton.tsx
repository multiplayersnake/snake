import React, { FC, AnchorHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import './Button.css';
import './NavButton.css';

type NavButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

const NavButton: FC<NavButtonProps> = (props) => {
  const { to, children, className, ...rest } = props;
  const navigate = useNavigate();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a {...rest} href={to} className={cn('button', 'nav-button', className)} onClick={handleClick}>
      {children}
    </a>
  );
};

export default NavButton;
