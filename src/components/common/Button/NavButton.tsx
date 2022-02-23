import React, { FC, AnchorHTMLAttributes, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import './Button.css';
import './NavButton.css';
import mscHover from '../../../assets/sound/button_hover.mp3';

type NavButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

export const NavButton: FC<NavButtonProps> = (props) => {
  const { to, children, className, ...rest } = props;
  const history = useHistory();
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      history.push(to);
    },
    [history, to]
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
            console.log(reason);
          });
    */
  }, []);

  return (
    <a {...rest} href={to} className={cn('button', 'nav-button', className)} onClick={handleClick} onMouseEnter={hover}>
      <audio ref={ref} src={mscHover} autoPlay={false} preload={'auto'} />
      {children}
    </a>
  );
};
