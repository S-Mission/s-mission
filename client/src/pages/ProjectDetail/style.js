import styled from 'styled-components';

export const DetailContainer = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
`;

export const Wrap = styled.div`
  width: 90%;
  max-width: 1600px;
  background-color: white;
  border-radius: 5px;
  padding: 48px;
  margin-top: 64px;
  display: flex;
  justify-content: space-between;
`;

export const LeftSide = styled.div`
  width: 55%;
`;

export const Title = styled.div`
  text-align: center;
  font-weight: bolder;
  font-size: 28px;
`;

export const CategoryDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  margin-bottom: 16px;

  & > div:nth-child(2) {
    color: #c7cad2;
    line-height: 32px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  border-top: 1px solid #dbdbdb;
  padding-top: 16px;
  margin-bottom: 16px;
`;

export const CommentContainer = styled.div`
  width: 100%;
  border-top: 1px solid #dbdbdb;
  padding-top: 32px;

  & input {
    padding: 12px;
    width: 100%;
    border: 1px solid #dbdbdb;
  }
`;

export const RightSide = styled.div`
  width: 41%;
`;

export const FileContainer = styled.div`
  color: #1990ff;
  margin-top: 32px;
`;

export const EditDeleteContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;

  & > button:nth-child(1) {
    margin-right: 8px;
  }
`;

export const ChatImgContainer = styled.div`
  position: fixed;
  right: 5%;
  bottom: 10%;
`;
