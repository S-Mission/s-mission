import styled from 'styled-components';
import { Input } from 'antd';

const { Search } = Input;

export const SearchBox = styled(Search)`
  width: 160px;
  height: 32px;
  box-shadow: 0 5px 20px -5px rgb(0 0 0 / 7%);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    justify-content: flex-start;

    & > div {
      color: gray;
      padding-top: 8px;
    }
  }
`;

export const ListContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 24px;

  & > div {
    width: 335px;
    min-height: 200px;
    background-color: #f4f5f7;
    border-radius: 5%;
    margin-right: 32px;
    padding: 16px;
  }
`;
