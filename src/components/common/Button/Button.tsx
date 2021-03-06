import React, { FC, ButtonHTMLAttributes, useRef, useCallback } from 'react';
import cn from 'classnames';

import { getButtonVariantClassName } from './utils';

import mscHover from '../../../assets/sound/button_hover.mp3';

import './Button.css';

export type ButtonVariant = 'regular' | 'icon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export const Button: FC<ButtonProps> = (props) => {
  const { variant = 'regular', type = 'button', children, className, ...rest } = props;

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
    <button
      {...rest}
      className={cn('button', getButtonVariantClassName(variant), className)}
      type={type}
      onMouseEnter={hover}
    >
      <audio ref={ref} src={mscHover} autoPlay={false} preload="auto" />
      {children}
    </button>
  );
};
