import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { RootState } from '../../../index';

import './Confirm.css';
import { useDispatch, useSelector } from 'react-redux';
import { hideConfirm } from '../../../store/reducers/confirm';
import Button from '../../Button';

const Confirm: FC = () => {
  const dispatch = useDispatch();

  const message: string = useSelector((state: RootState) => state['confirm']['message']);
  const isVisible: boolean = useSelector((state: RootState) => state['confirm']['isVisible']);
  const yesFunction = useSelector((state: RootState) => state['confirm']['yesFunction']);

  const hide = useCallback(() => {
    dispatch(hideConfirm());
  }, [dispatch]);

  const yes = useCallback(() => {
    yesFunction();
  }, [yesFunction]);

  const vClass = isVisible ? 'show' : 'hide';
  return (
    <div className={cn('shadow', vClass)} onClick={hide}>
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
