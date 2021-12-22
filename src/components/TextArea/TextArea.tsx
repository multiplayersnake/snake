import React, { FC, TextareaHTMLAttributes } from 'react';
import cn from 'classnames';

import './TextArea.css';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

const TextArea: FC<TextAreaProps> = (props) => {
  const { label, className, ...rest } = props;

  return (
    <label className="text-area-container">
      <span className="text-area-label">{label}</span>
      <textarea {...rest} className={cn('text-area', className)} />
    </label>
  );
};

export default TextArea;
