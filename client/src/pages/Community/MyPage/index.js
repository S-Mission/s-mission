import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table } from 'antd';
import {
  ButtonContainer,
  Left,
  MyPageContainer,
  Picture,
  Right,
  Wrap,
} from './style';
import { loadUserPostAction } from 'redux/actions/post_actions';
import Modal from 'antd/lib/modal/Modal';

const columns = [
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    width: '70%',
    align: 'center',
    render: (title, record) => (
      <div style={{ textAlign: 'start' }}>
        <Link to={`/post/detail/${record._id}`} style={{ color: 'black' }}>
          {title.length >= 80 ? title.slice(0, 80) + '...' : title}
        </Link>
      </div>
    ),
  },
  {
    title: '작성일',
    dataIndex: 'date',
    key: 'date',
    width: '20%',
    align: 'center',
  },
  {
    title: '조회수',
    dataIndex: 'views',
    key: 'views',
    width: '10%',
    align: 'center',
  },
];

function MyPage() {
  const [signInVisible, setSignInVisible] = useState(false);

  const showSignInModal = () => {
    setSignInVisible(true);
  };
  const handleSignInCancel = () => {
    setSignInVisible(false);
  };

  const { userId, user, isAuthenticated } = useSelector((state) => state.auth);
  const { userPost } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserPostAction(userId));
  }, [dispatch, userId]);

  return (
    <MyPageContainer>
      {isAuthenticated ? (
        <Wrap>
          <Left>
            <h2>{user.name}님의 마이페이지</h2>
            <Picture>
              <div>
                <img src="https://placeimg.com/200/200/people" />
              </div>
              <div>
                <Button type="primary" onClick={showSignInModal}>
                  사진 수정하기
                </Button>
              </div>
            </Picture>
          </Left>

          <Right>
            <h2>작성한 게시글</h2>
            <Table columns={columns} dataSource={userPost} />
            <ButtonContainer>
              <Link to="">회원 정보 수정하기</Link>
              <Link to={`/user/closeaccount/${userId}`}>회원 탈퇴하기</Link>
            </ButtonContainer>
          </Right>
        </Wrap>
      ) : (
        <div>로그인이 필요한 서비스입니다.</div>
      )}

      <Modal
        visible={signInVisible}
        onCancel={handleSignInCancel}
        footer=""
      ></Modal>
    </MyPageContainer>
  );
}

export default MyPage;
