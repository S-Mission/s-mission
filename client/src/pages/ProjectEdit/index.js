import React, { useState, useLayoutEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editprojectAction,
  updateprojectAction,
} from 'redux/actions/project_actions';
import { Form, Input, Button, Upload } from 'antd';

import axios from 'axios';

// Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import { UploadOutlined } from '@ant-design/icons';
import { PostWriteHeader, ProjectWriteContainer } from './style';

function ProjectEdit(req) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { projectdetail } = useSelector(state => state.project);
  const { category, contents, creator, title } = projectdetail;

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [form, setForm] = useState({
    title: `${title}`,
    contents: `${contents}`,
    fileUrl: '',
    category: [],
  });

  const onValueChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const editorRef = createRef();

  const onEditorChange = () => {
    const val = editorRef.current.getInstance().getHTML();
    setForm({
      ...form,
      contents: val,
    });
  };

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(editprojectAction(req.match.params.id));
  }, [req.match.params.id]);

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, contents, fileUrl, category } = form;
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('contents', contents);
    formData.append('fileUrl', fileUrl);
    formData.append('category', category);
    formData.append('token', token);

    dispatch(updateprojectAction(formData));
  };

  return (
    <ProjectWriteContainer>
      <PostWriteHeader>글 수정하기</PostWriteHeader>
      {console.log(projectdetail)}
      {/* 인증한 사용자만 볼 수 있음 */}
      {isAuthenticated ? (
        <Form>
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
              defaultValue={form.title}
            />
          </Form.Item>
          <Form.Item name={'category'} rules={[{ required: true }]}>
            <Input
              name="category"
              id="category"
              onChange={onValueChange}
              placeholder="카테고리를 입력해 주세요."
            />
          </Form.Item>
          <Form.Item
            name={'fileUrl'}
            label="project file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="fileUrl"
              action="/upload.do"
              listType="picture"
              fileList={[form.fileUrl]}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Editor
            previewStyle="vertical"
            height="400px"
            useCommandShortcut={true}
            initialEditType="wysiwyg"
            ref={editorRef}
            onChange={onEditorChange}
            initialValue={form.contents}
          />
          <Button onClick={onSubmit} type="primary" style={{ width: '100%' }}>
            수정하기
          </Button>
        </Form>
      ) : (
        <div>로그인하고 이용하세요.</div>
      )}
    </ProjectWriteContainer>
  );
}

export default ProjectEdit;
