type Actions = 'SHOW_CONFIRM' | 'HIDE_CONFIRM';

const actions = {
  SHOW_CONFIRM: 'SHOW_CONFIRM',
  HIDE_CONFIRM: 'HIDE_CONFIRM'
};

type ConfirmState = {
  message: string;
  isVisible: boolean;
  onConfirm?: () => void;
};

const defaultState: ConfirmState = {
  message: '',
  isVisible: false,
  onConfirm: null
};

interface BaseActionType<T> {
  type: T;
}

interface ItemActionType extends BaseActionType<Actions> {
  message: string;
  isVisible: boolean;
  onConfirm?: () => void;
}

export function confirmReducer(
  state: ConfirmState = defaultState,
  { type, message, onConfirm }: ItemActionType
): ConfirmState {
  switch (type) {
    case actions.SHOW_CONFIRM:
      return {
        ...state,
        message,
        isVisible: true,
        onConfirm: onConfirm
      };
    case actions.HIDE_CONFIRM:
      return {
        ...state,
        message,
        isVisible: false,
        onConfirm: null
      };
    default:
      return state;
  }
}

export function showConfirm(message: string, onConfirm: () => void): ItemActionType {
  return { type: 'SHOW_CONFIRM', message: message, isVisible: true, onConfirm: onConfirm };
}

export function hideConfirm(): ItemActionType {
  return { type: 'HIDE_CONFIRM', message: '', isVisible: false, onConfirm: null };
}
