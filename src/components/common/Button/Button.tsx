import React, { FC, ButtonHTMLAttributes, useRef, useCallback } from 'react';
import cn from 'classnames';

import './Button.css';
import mscHover from '../../../assets/sound/button_hover.mp3';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = (props) => {
  const { type = 'button', children, className, ...rest } = props;

  const ref = useRef(null);
  const hover = useCallback(() => {
    const obj = ref.current as HTMLAudioElement;
    obj.volume = 0.2;
    obj
      .play()
      .then(function () {
        // console.log('playing');
      })
      .catch(function (reason) {
        console.log(reason);
      });
  }, []);

  return (
    <button {...rest} className={cn('button', className)} type={type} onMouseEnter={hover}>
      <audio ref={ref} src={mscHover} autoPlay={false} preload={'auto'} />
      {children}
    </button>
  );
};

export default Button;
