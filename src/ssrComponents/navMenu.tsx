import * as React from 'react';
import { NavLink } from 'react-router-dom';

// TODO check CSS building
// import './navMenu.css';

const routes = ['/', '/home'];

export const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu-items">
        {routes.map((route) => (
          <li key={route} className="nav-menu-item">
            <NavLink to={route}>{route === '/' ? '/index' : route}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
