import React, { useState, useLayoutEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select } from 'antd';
import { createpostAction } from 'redux/actions/post_actions';

// Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import { PostWriteHeader, PostWriteContainer } from './style';

import Imageupload from './Imageupload';
import Fileupload from './Fileupload';
const { Option } = Select;

function PostWrite() {
  const [form, setForm] = useState({
    title: '',
    contents: '',
    previewImg: [],
    file: [],
    originalfileName: [],
    category: '',
  });

  // Change //
  const onValueChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSelectChange = (v) => {
    setForm({
      ...form,
      category: v,
    });
  };

  const onEditorChange = () => {
    const val = editorRef.current.getInstance().getHTML();
    setForm({
      ...form,
      contents: val,
    });
  };

  const onImageChange = (image) => {
    setForm({
      ...form,
      previewImg: image,
    });
  };

  const onFileChange = (file, filename) => {
    setForm({
      ...form,
      file: file,
      originalfileName: filename,
    });
  };

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const editorRef = createRef();

  const onSubmit = async (e) => {
    const { title, contents, category, previewImg, file, originalfileName } =
      form;
    const token = localStorage.getItem('token');
    let data = {
      title,
      contents,
      previewImg,
      category,
      token,
      file,
      originalfileName,
    };

    dispatch(createpostAction(data));
  };

  useLayoutEffect(() => {}, [dispatch]);

  return (
    <PostWriteContainer>
      <PostWriteHeader>글 작성하기</PostWriteHeader>
      {/* 인증한 사용자만 볼 수 있음 */}
      {isAuthenticated ? (
        <Form onFinish={onSubmit}>
          <Form.Item
            name={'title'}
            rules={[{ required: true }]}
            style={{ marginBottom: '8px' }}
          >
            <Input
              name="title"
              id="title"
              onChange={onValueChange}
              placeholder="제목을 입력해 주세요."
            />
          </Form.Item>
          <Form.Item name={'category'} rules={[{ required: true }]}>
            <Select
              name="category"
              style={{ width: '100%' }}
              onChange={onSelectChange}
              placeholder="카테고리를 선택하세요"
            >
              <Option value="web">Web</Option>
              <Option value="android">Android</Option>
              <Option value="ios">IOS</Option>
              <Option value="data">빅데이터</Option>
              <Option value="ML">인공지능</Option>
              <Option value="design">Design</Option>
            </Select>
          </Form.Item>
          <Form.Item name={'previewImg'} label="미리보기 이미지">
            <Imageupload refreshFunction={onImageChange} />
            <span>* 최대 3장까지 업로드 가능</span>
          </Form.Item>
          <Form.Item name={'file'} label="첨부파일">
            <Fileupload refreshFunction={onFileChange} />
          </Form.Item>
          <Editor
            previewStyle="vertical"
            height="400px"
            useCommandShortcut={true}
            initialEditType="wysiwyg"
            ref={editorRef}
            onChange={onEditorChange}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              글쓰기
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div>로그인하고 이용하세요.</div>
      )}
    </PostWriteContainer>
  );
}

export default PostWrite;
