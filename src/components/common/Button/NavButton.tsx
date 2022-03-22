import React, { FC, AnchorHTMLAttributes, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import './Button.css';
import './NavButton.css';

import { setLevel } from '../../../store';
import mscHover from '../../../assets/sound/button_hover.mp3';

import { ButtonVariant } from './Button';
import { getButtonVariantClassName } from './utils';

type NavButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
  data?: { store: string; value: number };
  variant: ButtonVariant;
};

export const NavButton: FC<NavButtonProps> = (props) => {
  const { variant = 'regular', to, children, className, data, ...rest } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (data?.store === 'level') {
        dispatch(setLevel(data?.value));
      }

      e.preventDefault();
      history.push(to);
    },
    [data?.store, data?.value, history, to, dispatch]
  );

  const ref = useRef(null);
  const hover = useCallback(() => {
    /*
        const obj = ref.current as HTMLAudioElement;
        obj.volume = 0.2;
        obj
          .play()
          .then(function () {
            // console.log('playing');
          })
          .catch(function (reason) {
            // console.log(reason);
          });
    */
  }, []);

  return (
    <a
      {...rest}
      href={to}
      className={cn('button', getButtonVariantClassName(variant), 'nav-button', className)}
      onClick={handleClick}
      onMouseEnter={hover}
    >
      <audio ref={ref} src={mscHover} autoPlay={false} preload={'auto'} />
      {children}
    </a>
  );
};
