import React, { FC, useCallback, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditorEvent from '@ckeditor/ckeditor5-utils/src/eventinfo';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { formatDateTime } from '../../../utils';

import './Topic.css';

import { TopicModel } from '../../../database/models';

type TopicProps = {
  createdAt: string;
  author: string;
  mesCount: number;
  newCount: number;
  content: string;
  id: number;
  href: string;
  onDelete: (data: TopicModel) => void;
  onSave: (data: TopicModel) => void;
};

export const Topic: FC<TopicProps> = (props) => {
  const { id, createdAt, author, mesCount, newCount, content, href, onDelete, onSave } = props;
  const [topicContent, setTopicContent] = useState(content);

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(
    (e?) => {
      e?.preventDefault();
      e?.stopPropagation();

      if (editMode) {
        setTopicContent(content);
        setEditMode(false);
        return;
      }

      setEditMode(true);
    },
    [content, editMode]
  );

  const handleChange = useCallback((event: EditorEvent, editor: ClassicEditor) => {
    setTopicContent(editor.getData());
  }, []);

  const handleDelete = useCallback(
    (e) => {
      e?.preventDefault();
      e?.stopPropagation();

      onDelete({ id });
    },
    [id, onDelete]
  );

  const handleSave = useCallback(
    (e?) => {
      e?.preventDefault();
      e?.stopPropagation();

      onSave({ id, content: topicContent });
      toggleEditMode();
    },
    [onSave, id, topicContent, toggleEditMode]
  );

  let newElem = '';
  if (newCount > 0) newElem = ` (новых ${newCount})`;

  const history = useHistory();
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (editMode) return;

      history.push(href);
    },
    [editMode, history, href]
  );

  return (
    <a href={href} onClick={handleClick}>
      <div className="topic text-field">
        <div className="topic-dateTime text-field">
          Создана: <b>{formatDateTime(createdAt)}</b>
        </div>

        <div className={cn('topic-author', 'text-field')}>
          Автор: <b>{author}</b>
        </div>

        <div className="topic-mes-count text-field">
          Сообщений: {mesCount}
          <b>{newElem}</b>
        </div>

        <div className="topic-edit">
          <button className="topic-button" onClick={toggleEditMode}>
            {editMode ? 'Выйти из редактирования' : 'Редактировать'}
          </button>
        </div>

        <div className="topic-delete">
          <button className="topic-button" onClick={handleDelete}>
            Удалить
          </button>
        </div>

        <div className="topic-content">
          <CKEditor
            editor={ClassicEditor}
            data={topicContent}
            onChange={handleChange}
            config={{
              toolbar: editMode ? ['bold', 'italic', 'link', 'numberedList', 'bulletedList', '|', 'undo', 'redo'] : []
            }}
            disabled={!editMode}
            key={`${editMode}`}
          />
        </div>

        {editMode && (
          <div className="topic-save">
            <button className="topic-button" onClick={handleSave}>
              Сохранить
            </button>
          </div>
        )}
      </div>
    </a>
  );
};
