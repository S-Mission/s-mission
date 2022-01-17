import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createcommentAction } from 'redux/actions/comment_actions';
import { CommentBox, CommentButton } from './style';

function Comments({ id, userId, userName }) {
  const [contents, setContents] = useState('');

  const dispatch = useDispatch();

  const onChange = (e) => {
    setContents(e.target.value);
  };

  const onSubmit = useCallback(
    (e) => {
      const token = localStorage.getItem('token');
      const data = { contents, token, id, userId, userName };

      dispatch(createcommentAction(data));

      setContents('');
    },
    [dispatch, contents, id, userId, userName],
  );

  return (
    <div>
      <h2>
        <b>COMMENTS</b>
      </h2>
      <CommentBox>
        <input
          id="contents"
          name="contents"
          placeholder="댓글을 입력해주세요."
          onChange={onChange}
        />
        <CommentButton type="primary" onClick={onSubmit}>
          작성하기
        </CommentButton>
      </CommentBox>
    </div>
  );
}

export default Comments;
