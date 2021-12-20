import { Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createcommentAction } from 'redux/actions/comment_actions';
import { COMMENT_LOADING_REQUEST } from 'redux/types/project_types';
import { Comment_Button } from './style';

function Comments({ id, userId, userName }) {
  const dispatch = useDispatch();
  const [form, setValues] = useState({
    contents: '',
  });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();

    const { contents } = form;
    const token = localStorage.getItem('token');
    const body = { contents, token, id, userId, userName };

    dispatch(createcommentAction(body));

    resetValue.current.value = '';
    setValues('');
  };

  const resetValue = useRef(null);

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: id,
    });
  }, [dispatch, id]);

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
