import React, { FC, useCallback, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EditorEvent from '@ckeditor/ckeditor5-utils/src/eventinfo';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { formatDateTime } from '../../../utils';

import './Topic.css';

import { TopicModel } from '../../../database/models';
import ImgButton from '../../common/Button/ImgButton';
import srcBtnDel from '../../../assets/images/btnDelete.gif';
import srcBtnEdit from '../../../assets/images/btnEdit.gif';
import srcBtnSave from '../../../assets/images/btnSave.gif';
import srcBtnUndo from '../../../assets/images/undo.gif';

type TopicProps = {
  createdAt: string;
  author: string;
  authorId: number;
  currentUserId: number;
  mesCount: number;
  newCount: number;
  content: string;
  id: number;
  href: string;
  onDelete: (data: TopicModel) => void;
  onSave: (data: TopicModel) => void;
};

export const Topic: FC<TopicProps> = (props) => {
  const { id, createdAt, author, authorId, currentUserId, mesCount, newCount, content, href, onDelete, onSave } = props;
  const [topicContent, setTopicContent] = useState(content);

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(
    (e?) => {
      e?.preventDefault();
      e?.stopPropagation();

      if (editMode) {
        setTopicContent(topicContent);
        setEditMode(false);
        return;
      }

      setEditMode(true);
    },
    [topicContent, editMode]
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
  if (newCount > 0) newElem = ` (${newCount})`;

  const history = useHistory();
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (editMode) return;

      history.push(href);
    },
    [editMode, history, href]
  );

  const classEdit = currentUserId === authorId ? cn('topic-edit') : cn('topic-edit', 'topic_hidden');
  const classDelete =
    currentUserId === authorId && parseInt(String(mesCount)) === 0
      ? cn('topic-delete')
      : cn('topic-delete', 'topic_hidden');

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

        <div className={classEdit}>
          <ImgButton className="topic-button" onClick={toggleEditMode}>
            {editMode ? (
              <img src={srcBtnUndo} width={'16px'} height={'16px'} alt={'Выйти из редактирования'} />
            ) : (
              <img src={srcBtnEdit} width={'16px'} height={'16px'} alt={'Редактировать'} />
            )}
          </ImgButton>
        </div>

        <div className={classDelete}>
          <ImgButton className="topic-button" onClick={handleDelete}>
            <img src={srcBtnDel} width={'16px'} height={'16px'} alt={'Удалить'} />
          </ImgButton>
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
            <ImgButton className="topic-button" onClick={handleSave}>
              <img src={srcBtnSave} width={'16px'} height={'16px'} alt={'Сохранить'} />
            </ImgButton>
          </div>
        )}
      </div>
    </a>
  );
};
