import styled from 'styled-components';

export const Right = styled.div`
  width: 80%;
  background-color: white;
  padding: 32px;
`;

export const Description = styled.div`
  margin-bottom: 32px;
`;

export const Member = styled.div`
  margin-bottom: 32px;
`;

export const MemberList = styled.div`
  display: flex;
  justify-content: flex-start;

  & > a {
    margin-right: 8px;

    & > img {
      border-radius: 70%;
    }
  }
`;
