import React, { useState, createRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatepostAction, editpostAction } from 'redux/actions/post_actions';
import { Form, Input, Button, Upload, Select } from 'antd';
import Imageupload from './Imageupload';

// Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import { PostWriteHeader, PostWriteContainer } from './style';

const { Option } = Select;
function PostEdit(req) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { postdetail, category, title, contents, preimages } = useSelector(
    (state) => state.post,
  );

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [form, setForm] = useState({
    title: `${postdetail.title == undefined ? title : postdetail.title}`,
    contents: `${
      postdetail.contents == undefined ? contents : postdetail.contents
    }`,
    category: `${category.categoryName}`,
  });
  const [Image, setImage] = useState([]);

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

  const onImageChange = (image) => {
    setImage(image);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(editpostAction(req.match.params.id));
  }, [req.match.params.id]);

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { title, contents, category } = form;
    const token = localStorage.getItem('token');
    let data = {
      title,
      contents,
      Image,
      category,
      token,
      id: req.match.params.id,
    };

    dispatch(updatepostAction(data));
  };

  return (
    <PostWriteContainer>
      <PostWriteHeader>??? ????????????</PostWriteHeader>
      {/* ????????? ???????????? ??? ??? ?????? */}
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
              defaultValue={form.title ? form.title : 0}
            />
          </Form.Item>
          <Form.Item name={'category'} rules={[{ required: true }]}>
            <Select
              name="category"
              style={{ width: 200 }}
              onChange={onValueChange}
              placeholder="??????????????? ???????????????"
              defaultValue={form.category}
            >
              <Option value="web">Web</Option>
              <Option value="android">Android</Option>
              <Option value="ios">IOS</Option>
              <Option value="data">????????????</Option>
              <Option value="ML">????????????</Option>
              <Option value="design">Design</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={'previewImg'}
            label="post file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Imageupload refreshFunction={onImageChange} />
            <span>* ?????? 3????????? ????????? ??????</span>
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
            ????????????
          </Button>
        </Form>
      ) : (
        <div>??????????????? ???????????????.</div>
      )}
    </PostWriteContainer>
  );
}

export default PostEdit;
