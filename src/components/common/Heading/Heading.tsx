import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import './Heading.css';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  tag?: HeadingTag;
};

export const Heading: FC<HeadingProps> = (props) => {
  const { children, className, tag: Tag = 'h1', ...rest } = props;

  return (
    <Tag {...rest} className={cn('heading', Tag, className)}>
      {children}
    </Tag>
  );
};
