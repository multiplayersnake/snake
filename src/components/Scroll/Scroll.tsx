import React, { FC, MouseEvent, WheelEvent, useEffect, useRef } from 'react';
import cn from 'classnames';

import './Scroll.css';
import Heading from '../Heading';

type ScrollProps = {
  title: string;
  mode: 'First' | 'Last';
};

const ScrollComponent: FC<ScrollProps> = (props) => {
  const contentRef = useRef(null);
  const trackRef = useRef(null);
  const { children, title, mode } = props;
  let dragMode = 0;
  let dragStartY = 0;

  useEffect(() => {
    scrollContent();
    if (mode === 'Last') {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    } else {
      contentRef.current.scrollTop = 0;
    }
  });

  function getScrollParameters() {
    const hiddenHeight = contentRef.current.scrollHeight;
    const viewHeight = contentRef.current.clientHeight;
    let trackHeight = viewHeight * (viewHeight / hiddenHeight);
    if (hiddenHeight <= viewHeight) trackHeight = 0;

    const curTop = contentRef.current.scrollTop;
    const maxTop = hiddenHeight - viewHeight;
    const maxTrackTop = viewHeight - trackHeight;
    const curTrackTop = parseInt(trackRef.current.style.top);

    return { hiddenHeight, viewHeight, trackHeight, curTop, maxTop, curTrackTop, maxTrackTop };
  }

  const onMouseDownTrack = (e: MouseEvent<HTMLDivElement>) => {
    dragMode = 1;
    dragStartY = e.pageY;
  };

  const onMouseUpTrack = () => {
    dragMode = 0;
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (dragMode === 1) {
      e.preventDefault();
      const sp = getScrollParameters();
      let newTop = parseInt(trackRef.current.style.top) + e.pageY - dragStartY;
      if (newTop < 0) newTop = 0;
      if (newTop > sp.maxTrackTop) newTop = sp.maxTrackTop;
      trackRef.current.style.top = newTop + 'px';
      dragStartY = e.pageY;
      scrollTrack();
    }
  };

  const wheelProcess = (e: WheelEvent<HTMLDivElement>) => {
    if (e.nativeEvent.deltaY !== 0) {
      contentRef.current.scrollTop += e.nativeEvent.deltaY / 2;
    }
  };

  const upClick = () => {
    contentRef.current.style.scrollBehavior = 'smooth';
    contentRef.current.scrollTop -= 300;
    contentRef.current.style.scrollBehavior = '';
  };

  const downClick = () => {
    const curPosition = contentRef.current.scrollTop;
    contentRef.current.style.scrollBehavior = 'smooth';
    contentRef.current.scrollTop = curPosition + 300;
    contentRef.current.style.scrollBehavior = '';
  };

  const scrollTrack = () => {
    const sp = getScrollParameters();
    contentRef.current.scrollTop = Math.ceil(sp.maxTop * (sp.curTrackTop / sp.maxTrackTop));
  };

  const scrollContent = () => {
    const sp = getScrollParameters();
    trackRef.current.style.height = sp.trackHeight + 'px';
    trackRef.current.style.top = Math.ceil(sp.maxTrackTop * (sp.curTop / sp.maxTop)) + 'px';
  };

  return (
    <div className="scroll" onWheel={wheelProcess} onMouseMove={onMouseMove} onMouseUp={onMouseUpTrack}>
      <Heading className={cn('scroll-title', 'h4')}>{title}</Heading>
      <span className={cn('scroll-up-button', 'img-button')} onClick={upClick} />
      <div className={cn('scroll-bar')}>
        <div
          ref={trackRef}
          className={cn('scroll-bar-track')}
          onMouseDown={onMouseDownTrack}
          onMouseUp={onMouseUpTrack}
          onMouseMove={onMouseMove}
          style={{ top: 0 }}
        />
      </div>
      <span className={cn('scroll-down-button', 'img-button')} onClick={downClick} />
      <div className={cn('scroll-content')} ref={contentRef} onScroll={scrollContent}>
        {children}
      </div>
    </div>
  );
};

export default ScrollComponent;
