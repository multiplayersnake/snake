export type MenuItemType = {
  title: string;
  path?: string;
  action?: () => void;
  authorizedOnly?: boolean;
};
