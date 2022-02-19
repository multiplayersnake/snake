import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  RootState,
  getModalCancelable,
  getModalMessage,
  getModalOnConfirm,
  getModalVisible,
  hideModal
} from '../../../store';

import { Button, Heading } from '../../common';

import './Modal.css';

export const Modal: FC = () => {
  const dispatch = useDispatch();

  const visible = useSelector<RootState, boolean>(getModalVisible);
  const cancelable = useSelector<RootState, boolean>(getModalCancelable);
  const message = useSelector<RootState, string>(getModalMessage);
  const onConfirm = useSelector<RootState, () => void>(getModalOnConfirm);

  const hide = useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  const confirm = useCallback(() => {
    onConfirm();
    dispatch(hideModal());
  }, [dispatch, onConfirm]);

  if (!visible) {
    return null;
  }

  const confirmLabel = cancelable ? 'Да' : 'ОК';

  return (
    <div className="modal-container">
      <div className="modal">
        <Heading tag="h6">{message}</Heading>

        <div className="modal-buttons">
          <Button onClick={confirm}>{confirmLabel}</Button>

          {cancelable && <Button onClick={hide}>Нет</Button>}
        </div>
      </div>
    </div>
  );
};
