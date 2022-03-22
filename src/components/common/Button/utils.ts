import { ButtonVariant } from './Button';

export function getButtonVariantClassName(variant: ButtonVariant): string {
  switch (variant) {
    case 'regular':
      return 'regular-button';

    case 'icon':
      return 'icon-button';
  }
}
