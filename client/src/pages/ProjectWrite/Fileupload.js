import React, { useState } from 'react';
import Axios from 'axios';

import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Dropzone from 'react-dropzone';

function Fileupload(props) {
  const [Files, setFiles] = useState([]);
  const [fileoriginalname, setfileoriginalname] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    Axios.post('/api/project/uploadfile', formData, config).then((res) => {
      if (res.data.success) {
        setFiles([...Files, res.data.filedest]);
        setfileoriginalname([...fileoriginalname, res.data.filename])
        props.refreshFunction([...Files, res.data.filedest], [...fileoriginalname, res.data.filename]);
        console.log(res.data);
      } else {
        alert('파일 업로드 실패');
      }
    });
  };

  return (
    <>
      <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
        {({ getRootProps, getInputProps }) => (
          <Button {...getRootProps()} icon={<UploadOutlined />}>
            <input {...getInputProps()} />
            &nbsp;&nbsp;Click to upload
          </Button>
        )}
      </Dropzone>
      <div>
        {Files.map((file, index) => (
          <div key={index}>
            {file}
          </div>
        ))}
      </div>
    </>
  );
}

export default Fileupload;
