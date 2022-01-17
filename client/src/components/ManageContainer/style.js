import styled from 'styled-components';

export const ManageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dbdbdb;
`;

export const LeftSide = styled.div`
  width: 20%;
  background-color: #eff2f5;
  min-height: 70vh;
  border-right: 1px solid #dbdbdb;
  text-align: center;
  font-size: 18px;
  padding-top: 32px;

  & > div {
    margin-bottom: 8px;

    & > a {
      color: black;
    }
  }
`;
