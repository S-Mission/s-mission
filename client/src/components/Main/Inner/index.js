import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// antd
import { Button, Card, Divider } from 'antd';

// style
import {
  InnerContainer,
  NavButton,
  CardContainer,
  CardContent,
  AsideBox,
  UserInfo,
  LoginBox,
} from './style';

// component
import LoginModal from 'components/LoginModal/LoginModal';
import { topRatedPostsAction } from 'redux/actions/post_actions';

const { Meta } = Card;

function Inner() {
  const [FirstButton, setFirstButton] = useState('primary');
  const [SecondButton, setSecondButton] = useState('default');
  const [ThirdButton, setThirdButton] = useState('default');

  const onClickNavButton = (number) => {
    if (number === 1) {
      setFirstButton('primary');
      setSecondButton('default');
      setThirdButton('default');
    } else if (number === 2) {
      setFirstButton('default');
      setSecondButton('primary');
      setThirdButton('default');
    } else if (number === 3) {
      setFirstButton('default');
      setSecondButton('default');
      setThirdButton('primary');
    }
  };

  const { isAuthenticated, userName } = useSelector((state) => state.auth);
  const { topRated } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(topRatedPostsAction());
  }, [dispatch]);

  return (
    <InnerContainer>
      <div>
        <div>
          <NavButton type={FirstButton} onClick={() => onClickNavButton(1)}>
            BEST
          </NavButton>
        </div>
        <CardContainer>
          {Array.isArray(topRated)
            ? topRated.map((post) => {
                let content = post.contents.replace(
                  /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
                  '',
                );

                return (
                  <Link to={`/post/detail/${post._id}`}>
                    <CardContent
                      cover={
                        // 이미지 링크는 나중에 S3로 옮기고 나서 해야될듯... 로컬에 파일이 없으니 사진이 안뜨니까
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                    >
                      <Meta
                        title={post.title}
                        description={
                          content.length >= 30
                            ? content.slice(0, 30) + '...'
                            : content
                        }
                      />
                    </CardContent>
                  </Link>
                );
              })
            : ''}
        </CardContainer>
      </div>

      <AsideBox>
        {isAuthenticated ? (
          <UserInfo>
            <Divider orientation="center">User Info</Divider>
            <img src="https://placeimg.com/150/150/person" alt="selfImage" />
            <h3>{userName}</h3>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry ...
            </div>
            <Link to="/post/write">
              <Button type="primary">글쓰기</Button>
            </Link>
          </UserInfo>
        ) : (
          <LoginBox>
            <div>로그인이 필요합니다.</div>
            <LoginModal buttonType="primary" />
          </LoginBox>
        )}
      </AsideBox>
    </InnerContainer>
  );
}

export default Inner;
