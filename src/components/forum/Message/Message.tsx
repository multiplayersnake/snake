import React, { FC, useCallback, useState } from 'react';
import cn from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './Message.css';
import { MessageModel } from '../../../database/models/message';

type MessageProps = {
  id: number;
  dateTime: string;
  author: string;
  content: string;
  deleteFunction: (data: MessageModel) => void;
  saveFunction: (data: MessageModel) => void;
};

export const Message: FC<MessageProps> = (props) => {
  const { id, dateTime, author, content, deleteFunction, saveFunction } = props;

  const [editData, setEditData] = useState(content);

  const deleteClick = useCallback(() => {
    deleteFunction({ id });
  }, [id, deleteFunction]);

  const saveClick = useCallback(() => {
    saveFunction({ id, content: editData });
  }, [id, saveFunction, editData]);

  return (
    <div className={cn('message', 'text-field')}>
      <div className={'message-author'}>
        {author} &nbsp;&nbsp; {dateTime}
      </div>
      <div className={'message-edit'}>
        <button className={'message-button'}>Edit</button>
      </div>
      <div className={'message-delete'}>
        <button className={'message-button'} onClick={deleteClick}>
          Delete
        </button>
      </div>
      <div className={'message-content'}>
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event: Event, editor: CKEditor) => {
            setEditData(editor.getData());
          }}
          config={{
            toolbar: ['bold', 'italic', 'link', 'numberedList', 'bulletedList', '|', 'undo', 'redo']
          }}
        />
      </div>
      <div className={'message-save'}>
        <button className={'message-button'} onClick={saveClick}>
          Save
        </button>
      </div>
    </div>
  );
};
