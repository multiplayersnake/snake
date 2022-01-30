import React, { FC, MouseEvent, WheelEvent, useEffect, useRef } from 'react';
import cn from 'classnames';

import { Heading } from '..';

import './Scroll.css';

type ScrollProps = {
  title?: string;
  mode: 'First' | 'Last';
  id: string;
};

export const Scroll: FC<ScrollProps> = (props) => {
  const contentRef = useRef(null);
  const trackRef = useRef(null);
  const { children, title = '', mode, id } = props;
  let dragMode = 0;
  let dragStartY = 0;

  useEffect(() => {
    const savedScrollPosition = localStorage.getItem(`scroll_position_${id}`);
    if (savedScrollPosition) {
      contentRef.current.scrollTop = savedScrollPosition;
    } else {
      if (mode === 'Last') {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      } else {
        contentRef.current.scrollTop = 0;
      }
    }
    scrollContent();
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
    const curPosition = contentRef.current.scrollTop;
    contentRef.current.style.scrollBehavior = 'smooth';
    contentRef.current.scrollTop = curPosition - 300;
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
    localStorage.setItem(`scroll_position_${id}`, contentRef.current.scrollTop);
  };

  return (
    <div className="scroll" onWheel={wheelProcess} onMouseMove={onMouseMove} onMouseUp={onMouseUpTrack}>
      <Heading tag="h4">{title}</Heading>
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
