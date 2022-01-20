import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { RootState } from '../../../index';
import { hideAlert } from '../../../store/reducers/alert';
import Button from '../../Button';

import './Alert.css';

const Alert: FC = () => {
  const dispatch = useDispatch();

  const message: string = useSelector((state: RootState) => state['alert']['message']);
  const isVisible: boolean = useSelector((state: RootState) => state['alert']['isVisible']);

  const hide = useCallback(() => {
    dispatch(hideAlert());
  }, [dispatch]);

  const visibilityClass = isVisible ? 'show' : 'hide';
  return (
    <div className={cn('shadow', visibilityClass)} onClick={hide}>
      <div className={cn('heading', 'h6', 'alert')}>
        {message}
        <Button>ОК</Button>
      </div>
    </div>
  );
};

export default Alert;
