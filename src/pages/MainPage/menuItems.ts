import { MenuActionType } from '../../types';

const menuItems = [
  { path: '/game-type', title: 'В бой!' },
  { path: '/profile', title: 'Профиль' },
  { path: '/topics', title: 'Форум' },
  { action: MenuActionType.Logout, title: 'Выйти', authorizedOnly: true }
];

export default menuItems;
