import React, { FC, useCallback } from 'react';
import cn from 'classnames';

import './Alert.css';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../../../store/reducers/alert';
import Button from '../../Button';

const Alert: FC = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const message: string = useSelector((state) => state['alert']['message']);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isVisible: string = useSelector((state) => state['alert']['isVisible']);

  const hide = useCallback(() => {
    dispatch(hideAlert());
  }, [dispatch]);

  const vClass = isVisible ? 'show' : 'hide';
  return (
    <div className={cn('shadow', vClass)} onClick={hide}>
      <div className={cn('heading', 'h6', 'alert')}>
        {message}
        <Button>ОК</Button>
      </div>
    </div>
  );
};

export default Alert;
