import React from 'react';
import LogoImg from './logo.png';
import { useSelector } from 'react-redux';

// antd
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// style
import { Logo, MenuContainer, NavbarContainer, Wrap } from './style';

// component
import LoginModal from 'components/LoginModal/LoginModal';
import SearchInput from 'components/SearchInput';
import { Link } from 'react-router-dom';

const menu = (
  <Menu style={{ marginTop: '-32px' }}>
    <Menu.Item>
      <Link to="/post/category/web">Web</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/post/category/android">Android</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/post/category/ios">iOS</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/post/category/bigdata">Big data</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/post/category/ai">AI</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/post/category/design">Design</Link>
    </Menu.Item>
  </Menu>
);

function Navbar() {
  const { isAuthenticated, userId } = useSelector((state) => state.auth);

  return (
    <NavbarContainer>
      <Wrap>
        <Logo href="/">
          <img src={LogoImg} alt="logo" />
        </Logo>
        <MenuContainer>
          <Dropdown overlay={menu} placement="bottomCenter">
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{ color: 'black' }}
            >
              Category
              <DownOutlined style={{ paddingLeft: '4px' }} />
            </a>
          </Dropdown>
          <Link
            to="/manage/overview"
            style={{ marginLeft: '32px', color: 'black' }}
          >
            My Projects
          </Link>
        </MenuContainer>
        <SearchInput />
        <LoginModal buttonType="default" />
        {isAuthenticated ? (
          <a href={`/user/mypage/${userId}`}>
            <Button type="primary">My Page</Button>
          </a>
        ) : (
          <a href="/user/signup">
            <Button type="primary">Sign Up</Button>
          </a>
        )}
      </Wrap>
    </NavbarContainer>
  );
}

export default Navbar;
