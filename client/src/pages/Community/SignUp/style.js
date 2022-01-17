import Form from 'antd/lib/form/Form';
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
`;

export const FormContainer = styled.div`
  width: 80%;
  padding: 5% 0;
  margin-left: 10%;

  & > div:nth-child(1) {
    width: 100%;
    text-align: center;
    margin-bottom: 32px;

    & > a {
      font-size: 32px;
    }
  }

  & > h1 {
    text-align: center;
  }

  & > ${Form} > ${Form.Item} {
    margin-bottom: 16px;
  }
`;

export const SignUpSuccess = styled.div`
  text-align: center;
  padding: 64px;

  & > div {
    margin-bottom: 8px;
  }
`;
