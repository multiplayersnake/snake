import React, { FC, useCallback, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditorEvent from '@ckeditor/ckeditor5-utils/src/eventinfo';

import './Message.css';
import { MessageModel } from '../../../database/models';
import { formatDateTime } from '../../../utils';

type MessageProps = {
  id: number;
  createdAt: string;
  author: string;
  content: string;
  onDelete: (data: MessageModel) => void;
  onSave: (data: MessageModel) => void;
};

export const Message: FC<MessageProps> = (props) => {
  const { id, createdAt, author, content, onDelete, onSave } = props;
  const [messageContent, setMessageContent] = useState(content);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    if (editMode) {
      setMessageContent(content);
      setEditMode(false);
      return;
    }

    setEditMode(true);
  }, [content, editMode]);

  const handleChange = useCallback((event: EditorEvent, editor: ClassicEditor) => {
    setMessageContent(editor.getData());
  }, []);

  const handleDelete = useCallback(() => {
    onDelete({ id });
  }, [id, onDelete]);

  const handleSave = useCallback(() => {
    onSave({ id, content: messageContent });
    toggleEditMode();
  }, [onSave, id, messageContent, toggleEditMode]);

  return (
    <div className="message text-field">
      <div className="message-author">
        {author} &nbsp;&nbsp; {formatDateTime(createdAt)}
      </div>

      <div className="message-edit">
        <button className="message-button" onClick={toggleEditMode}>
          {editMode ? 'Выйти из редактирования' : 'Редактировать'}
        </button>
      </div>

      <div className="message-delete">
        <button className="message-button" onClick={handleDelete}>
          Удалить
        </button>
      </div>

      <div className="message-content">
        <CKEditor
          editor={ClassicEditor}
          data={messageContent}
          onChange={handleChange}
          config={{
            toolbar: editMode ? ['bold', 'italic', 'link', 'numberedList', 'bulletedList', '|', 'undo', 'redo'] : []
          }}
          disabled={!editMode}
          key={`${editMode}`}
        />
      </div>

      {editMode && (
        <div className="message-save">
          <button className="message-button" onClick={handleSave}>
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
};
