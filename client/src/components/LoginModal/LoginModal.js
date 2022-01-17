import React, { useState, useCallback, useEffect } from 'react';
import {
  googleLoginAction,
  loginAction,
  logoutAction,
} from 'redux/actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';
import { Modal, Form, Button, Input, Divider } from 'antd';
import { PasswordBox, SignupBox } from './style';

function LoginModal({ buttonType }) {
  const [signInVisible, setSignInVisible] = useState(false);

  const showSignInModal = () => {
    setSignInVisible(true);
  };
  const handleSignInCancel = () => {
    setSignInVisible(false);
  };

  const [form, setValues] = useState({
    email: '',
    password: '',
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

      const { email, password } = form;
      const user = { email, password };

      dispatch(loginAction(user));
    },
    [form, dispatch],
  );

  useEffect(() => {
    if (isAuthenticated) {
      setSignInVisible(false);
    }
  }, [isAuthenticated]);

  const onLogoutClick = () => {
    if (window.confirm('로그아웃 하시겠습니까?') === true) {
      dispatch(logoutAction());
    } else {
      return false;
    }
  };

  const responseGoogle = (res) => {
    const { email, name } = res.profileObj;
    const { tokenId } = res;

    const user = { email, name, tokenId };

    dispatch(googleLoginAction(user));
  };

  const responseFail = (err) => {
    console.log(err);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button onClick={onLogoutClick}>Logout</Button>
      ) : (
        <Button onClick={showSignInModal} type={buttonType}>
          Sign In
        </Button>
      )}
      <Modal
        title="LOGO"
        visible={signInVisible}
        onCancel={handleSignInCancel}
        footer=""
      >
        <div style={{ marginBottom: '32px', width: '100%' }}>
          <Divider>소셜 계정으로 로그인</Divider>
          <GoogleLogin
            clientId="534707785395-1c3aq9gp00tfbib4rgg0eemp6ma0ddup.apps.googleusercontent.com"
            render={(renderProps) => (
              <GoogleButton
                onClick={renderProps.onClick}
                style={{ width: '100%' }}
              >
                Sign in with Google
              </GoogleButton>
            )}
            onSuccess={responseGoogle}
            onFailure={responseFail}
            theme="dark"
          />
        </div>

        <Divider>이메일로 로그인</Divider>
        <div>
          <Form onSubmit={onSubmit}>
            <div>
              <Form.Item label="EMAIL" style={{ marginBottom: '16px' }}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={onChange}
                  style={{ width: '100%' }}
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

              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={onSubmit}
              >
                Sign In
              </Button>
            </div>
            <br />
            <PasswordBox>
              <span>
                <a href="/user/password" onClick={handleSignInCancel}>
                  Forgot a Password?
                </a>
              </span>
            </PasswordBox>
            <SignupBox>
              <span>Not a Member?&nbsp;&nbsp;</span>
              <span>
                <a href="/user/signup" onClick={handleSignInCancel}>
                  Sign Up
                </a>
              </span>
            </SignupBox>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
