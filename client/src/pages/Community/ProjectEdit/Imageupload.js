import React, { useState } from 'react';
import Axios from 'axios';

import { UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Dropzone from 'react-dropzone';

function Imageupload(props) {
  const [Images, setImages] = useState([]);

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append('file', files[0]);

    Axios.post('/api/project/uploadimage', formData, config).then((res) => {
      if (res.data.success) {
        setImages([...Images, res.data.image]);
        props.refreshFunction([...Images, res.data.image]);
      } else {
        alert("이미지 업로드 실패");
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
        {Images.map((image, index) => (
          <div key={index}>
            <img src={`http://localhost:7000/${image}`} alt={`${image}`} style={{ width: '300px'}} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Imageupload;
