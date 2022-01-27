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

import { Button } from '../..';
import Heading from '../../Heading';

import './Modal.css';

// компоненты Alert и Confirm заменены на универсальный Modal из-за большого дублирования кода
// Также предлагаю перейти с дефолтных импортов на обычные, это нужно для того чтобы можно было импортировать
// компонент просто указав путь до папки components
export const Modal: FC = () => {
  const dispatch = useDispatch();

  // логику можно прятать в селекторы
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
        {/* для форматирования заголовков используется компонент Heading, не стоит импортировать стили из его папки напрямую */}
        <Heading tag="h6">{message}</Heading>

        <div className="modal-buttons">
          <Button onClick={confirm}>{confirmLabel}</Button>

          {cancelable && <Button onClick={hide}>Нет</Button>}
        </div>
      </div>
    </div>
  );
};
