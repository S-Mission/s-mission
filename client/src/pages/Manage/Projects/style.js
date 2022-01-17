import styled from 'styled-components';
import { Input } from 'antd';

const { Search } = Input;

export const ProjectsContainer = styled.div`
  padding: 64px 5%;
  min-height: 70vh;
`;

export const ProjectsHeader = styled.div`
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 32px;

  & > div:nth-child(1) {
    display: flex;
    justify-content: space-between;
  }

  & > div:nth-child(2) {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
`;

export const SearchBox = styled(Search)`
  width: 25%;
  height: 32px;
  box-shadow: 0 5px 20px -5px rgb(0 0 0 / 7%);
`;
