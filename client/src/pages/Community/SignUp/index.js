import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from 'redux/actions/user_actions';

// antd
import { Button, Form, Input } from 'antd';

// style
import { FormContainer, SignUpContainer, SignUpSuccess, Wrap } from './style';

// component
import LogoImg from 'components/Navbar/logo.png';

function SignUp() {
  const [form, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
  });

  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const { name, email, password, passwordCheck } = form;

      if (password !== passwordCheck) {
        alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
      } else {
        const user = { name, email, password };

        dispatch(registerAction(user));
      }
    },
    [form, dispatch],
  );

  return (
    <SignUpContainer>
      <Wrap>
        {isAuthenticated ? (
          <SignUpSuccess>
            <div>회원가입에 성공했습니다</div>
            <a href="/">홈으로 가기</a>
          </SignUpSuccess>
        ) : (
          <FormContainer>
            <div>
              <a href="/">
                <img
                  src={LogoImg}
                  style={{ width: '64px', height: '64px' }}
                  alt="logo"
                />
              </a>
            </div>
            <Form onSubmit={onSubmit}>
              <Form.Item label="NAME">
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={onChange}
                />
              </Form.Item>
              <Form.Item label="EMAIL">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={onChange}
                />
              </Form.Item>

              <Form.Item label="PASSWORD">
                <Input.Password
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={onChange}
                />
              </Form.Item>

              <Form.Item label="PASSWORD CHECK">
                <Input.Password
                  type="password"
                  name="passwordCheck"
                  id="passwordCheck"
                  placeholder="Password Check"
                  onChange={onChange}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: '100%' }}
                  type="primary"
                  onClick={onSubmit}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </FormContainer>
        )}
      </Wrap>
    </SignUpContainer>
  );
}

export default SignUp;
