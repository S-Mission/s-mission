import { Menu } from 'antd';
import styled from 'styled-components';

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;

  box-shadow: 0 5px 20px -5px rgb(0 0 0 / 7%);
`;

export const Wrap = styled.div`
  width: 90%;
  height: 94px;
  max-width: 1600px;
  text-align: center;
  padding-top: 28px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MenuBox = styled(Menu)`
  width: 100vw;
  margin-top: 24px;
  height: 230px;
`;

export const Logo = styled.a`
  font-size: 32px;
  margin-top: -8px;
  text-align: start;
`;

export const MenuContainer = styled.div`
  width: 35%;
  display: flex;
  justify-content: flex-start;
  padding-top: 8px;

  & > div {
    width: 25%;

    & > a {
      color: #606f7b;
      text-align: center;
      transition: all 0.2s linear;
    }
    & > a:hover {
      color: #7674f5;
      border-bottom: 1px solid #7674f5;
      padding-bottom: 4px;
      transition: all 0.2s linear;
    }
  }
`;
