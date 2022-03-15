import { logOut } from '../../store';

const menuItems = [
  { path: '/game-type', title: 'В бой!' },
  { path: '/profile', title: 'Профиль' },
  { path: '/topics', title: 'Форум' },
  { action: logOut, title: 'Выйти', authorizedOnly: true }
];

export default menuItems;
