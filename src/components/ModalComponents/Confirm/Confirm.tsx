import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { RootState } from '../../../index';
import { hideConfirm } from '../../../store/reducers/confirm';
import Button from '../../Button';

import './Confirm.css';

const Confirm: FC = () => {
  const dispatch = useDispatch();

  const message: string = useSelector((state: RootState) => state['confirm']['message']);
  const isVisible: boolean = useSelector((state: RootState) => state['confirm']['isVisible']);
  const onConfirm = useSelector((state: RootState) => state['confirm']['onConfirm']);

  const hide = useCallback(() => {
    dispatch(hideConfirm());
  }, [dispatch]);

  const yes = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  const visibilityClass = isVisible ? 'show' : 'hide';
  return (
    <div className={cn('shadow', visibilityClass)} onClick={hide}>
      <div className={cn('heading', 'h6', 'confirm')}>
        {message}
        <div className={'flex-wrapper'} />
        <Button onClick={yes}>Да</Button>
        <Button>Нет</Button>
      </div>
    </div>
  );
};

export default Confirm;
