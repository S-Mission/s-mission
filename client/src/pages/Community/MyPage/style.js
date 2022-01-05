import styled from 'styled-components';

export const MyPageContainer = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  margin-bottom: 64px;
`;

export const Wrap = styled.div`
  width: 90%;
  max-width: 1600px;
  background-color: white;
  border-radius: 5px;
  padding: 64px;
  margin-top: 64px;
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div`
  width: 20%;
  text-align: center;
`;

export const Picture = styled.div`
  margin-top: 32px;
  display: inline-block;

  & > div:nth-child(1) {
    margin-bottom: 16px;

    & > img {
      border-radius: 70%;
    }
  }

  & > div:nth-child(2) {
    display: flex;
    justify-content: center;
  }
`;

export const Right = styled.div`
  width: 75%;

  & > h2 {
    margin-bottom: 24px;
  }

  & > div:nth-child(1) {
    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 48px;

  & > a:nth-child(1) {
    margin-right: 16px;
  }
`;
