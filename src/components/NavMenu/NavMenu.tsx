import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { User } from '../../types/models';
import LogoutLink from '../LogoutLink';
import routes from './routes';

import './NavMenu.css';

type NavLinkClassParams = {
  isActive: boolean;
};

function navLinkClass(params: NavLinkClassParams): string {
  return params.isActive ? 'active-link nav-menu-link' : 'nav-menu-link';
}

type NavMenuProps = {
  hidden?: boolean;
  user?: User;
  onLogout: () => void;
};

const NavMenu: FC<NavMenuProps> = ({ hidden, user, onLogout }) => {
  if (hidden) return null;

  return (
    <nav className="nav-menu">
      <ul className="nav-menu-items">
        {routes.map((route) => (
          <li key={route.path} className="nav-menu-item">
            <NavLink className={navLinkClass} to={route.path}>
              {route.title}
            </NavLink>
          </li>
        ))}
        {user && (
          <li className="nav-menu-item">
            <LogoutLink onLogout={onLogout} />
          </li>
        )}
      </ul>
      {user && <pre className="user-name">{JSON.stringify(user, null, 2)}</pre>}
    </nav>
  );
};

export default NavMenu;
