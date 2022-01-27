import { ModalState, ModalAction, ModalActionType } from './types';

const defaultState: ModalState = {
  message: '',
  onConfirm: null
};

export function modalReducer(state: ModalState = defaultState, action: ModalAction): ModalState {
  const { type, payload } = action;

  switch (type) {
    case ModalActionType.ShowModal:
      return { ...state, ...payload };

    case ModalActionType.HideModal:
      return { ...state, ...payload };

    default:
      return state;
  }
}
