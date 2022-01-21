import { ModalActionType, ModalAction } from './types';

export function showModal(message: string, onConfirm?: () => void): ModalAction {
  return {
    type: ModalActionType.ShowModal,
    payload: {
      message,
      onConfirm
    }
  };
}

export function hideModal(): ModalAction {
  return {
    type: ModalActionType.HideModal,
    payload: {
      message: '',
      onConfirm: null
    }
  };
}
