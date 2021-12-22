import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import routes from './routes';
import './NavMenu.css';

type NavLinkClassParams = {
  isActive: boolean;
};

function navLinkClass(params: NavLinkClassParams): string {
  return params.isActive ? 'active-link nav-menu-link' : 'nav-menu-link';
}

const NavMenu: FC = () => {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu-items">
        {routes.map((route) => (
          <li key={route.path}>
            <NavLink className={navLinkClass} to={route.path}>
              {route.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
