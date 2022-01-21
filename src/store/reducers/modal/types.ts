import { BaseAction } from '../../types';

export type ModalState = {
  message: string;
  onConfirm?: () => void;
};

export enum ModalActionType {
  ShowModal = 'ShowModal',
  HideModal = 'HideModal'
}

export interface ModalAction extends BaseAction<ModalActionType> {
  payload: ModalState;
}
