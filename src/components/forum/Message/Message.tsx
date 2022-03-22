import React, { FC, useCallback, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditorEvent from '@ckeditor/ckeditor5-utils/src/eventinfo';

import { Button } from '../../common';
import { MessageModel } from '../../../database/models';
import { formatDateTime } from '../../../utils';

import srcBtnDel from '../../../assets/images/btnDelete.gif';
import srcBtnEdit from '../../../assets/images/btnEdit.gif';
import srcBtnSave from '../../../assets/images/btnSave.gif';
import srcBtnUndo from '../../../assets/images/undo.gif';

import './Message.css';

type MessageProps = {
  id: number;
  createdAt: string;
  author: string;
  authorId: number;
  currentUserId: number;
  content: string;
  onDelete: (data: MessageModel) => void;
  onSave: (data: MessageModel) => void;
};

export const Message: FC<MessageProps> = (props) => {
  const { id, createdAt, author, authorId, currentUserId, content, onDelete, onSave } = props;
  const [messageContent, setMessageContent] = useState(content);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    if (editMode) {
      setMessageContent(messageContent);
      setEditMode(false);
      return;
    }
    setEditMode(true);
  }, [messageContent, editMode]);

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

  const classEdit = currentUserId === authorId ? 'message-edit' : 'message-edit message_hidden';
  const classDelete = currentUserId === authorId ? 'message-delete' : 'message-delete message_hidden';

  return (
    <div className="message text-field">
      <div className="message-author">
        {author} &nbsp;&nbsp; {formatDateTime(createdAt)}
      </div>

      <div className={classEdit}>
        <Button variant="icon" onClick={toggleEditMode}>
          {editMode ? (
            <img src={srcBtnUndo} width="16px" height="16px" alt="Выйти из редактирования" />
          ) : (
            <img src={srcBtnEdit} width="16px" height="16px" alt="Редактировать" />
          )}
        </Button>
      </div>

      <div className={classDelete}>
        <Button variant="icon" onClick={handleDelete}>
          <img src={srcBtnDel} width="16px" height="16px" alt="Удалить" />
        </Button>
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
          <Button variant="icon" onClick={handleSave}>
            <img src={srcBtnSave} width="16px" height="16px" alt="Сохранить" />
          </Button>
        </div>
      )}
    </div>
  );
};
