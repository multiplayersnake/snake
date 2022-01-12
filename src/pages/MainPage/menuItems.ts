import { MenuActionType } from '../../types/mainMenu';

const menuItems = [
  { path: '/game-type', title: 'В бой!' },
  { path: '/profile', title: 'Профиль' },
  { path: '/forum', title: 'Форум' },
  { action: MenuActionType.Logout, title: 'Выйти', authorizedOnly: true }
];

export default menuItems;
