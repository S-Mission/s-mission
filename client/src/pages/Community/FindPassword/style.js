import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #eef2f5;
`;

export const Wrap = styled.div`
  position: absolute;
  width: 35%;

  top: 50%;
  transform: translate(0, -50%);
  border-radius: 4px;
  background-color: white;
  border-bottom: 5px solid #1990ff;

  padding: 3%;

  & > div:nth-child(1) {
    text-align: center;

    & img {
      width: 64px;
      height: 64px;
      margin-bottom: 32px;
    }
  }
`;

export const SignUpSuccess = styled.div`
  text-align: center;
  padding: 64px;

  & > div {
    margin-bottom: 8px;
  }
`;

export const PasswordChangeSuccess = styled.div`
  text-align: center;
`;

export const PasswordChange = styled.div`
  margin-top: & > input {
    margin-bottom: 8px;
  }
  & > button {
    width: 100%;
  }
`;

export const EmailAuth = styled.div`
  & > div:nth-child(1) {
    text-align: center;
    margin-bottom: 8px;
  }
  & > button {
    width: 100%;
  }

  & > div:nth-child(3) {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;

    & > input {
      margin-right: 4px;
    }
  }
`;

export const EmailCheck = styled.div`
  & > div:nth-child(1) {
    margin-bottom: 8px;
  }
  & > div:nth-child(2) {
    display: flex;
    justify-content: space-between;

    & > input {
      margin-right: 4px;
    }
  }
`;
