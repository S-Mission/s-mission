import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createcommentAction } from 'redux/actions/comment_actions';

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
    <>
      <Input
        innerRef={resetValue}
        type="textarea"
        name="contents"
        id="contents"
        onChange={onChange}
        placeholder="Comment"
      />
      <Comment_Button color="primary" onSubmit={onSubmit}>
        Submit
      </Comment_Button>
    </>
  );
}

export default Comments;
