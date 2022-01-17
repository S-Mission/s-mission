import { Dropdown, Menu } from 'antd';
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

  & > img {
    width: 64px;
    height: 64px;
  }
`;

export const MenuContainer = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  padding-top: 8px;
`;
