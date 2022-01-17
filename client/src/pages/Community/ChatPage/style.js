import { Form } from 'antd';
import styled from 'styled-components';

export const ChatContainer = styled.div`
  width: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
`;

export const Wrap = styled.div`
  width: 90%;
  max-width: 1600px;
  background-color: white;
  border-radius: 5px;
  margin-top: 64px;
  display: flex;
  justify-content: space-between;
`;

export const UserList = styled.div`
  width: 20%;
  height: 100%;
  border: 1px solid #e4e8eb;
`;

export const ChatBox = styled.div`
  width: 80%;
  height: 100%;
`;

export const ChatList = styled.div`
  width: 100%;
  height: 93%;
`;

export const ChatForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 7%;

  & > input {
    width: 90%;
    height: 100%;
  }

  & > button {
    width: 10%;
    height: 100%;
  }
`;
