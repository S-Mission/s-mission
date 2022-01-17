import { Button } from 'antd';
import { CloseContainer, Wrap } from './style';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAccountAction } from 'redux/actions/user_actions';
import { SignUpSuccess } from 'pages/Community/SignUp/style';

function CloseAccount() {
  const { user, userId, closeAccount } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onCloseAccount = () => {
    dispatch(closeAccountAction(userId));
  };

  return (
    <CloseContainer>
      <Wrap>
        {closeAccount ? (
          <SignUpSuccess>
            <div>회원 탈퇴가 되었습니다.</div>
            <a href="/">홈으로 가기</a>
          </SignUpSuccess>
        ) : (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <h1>탈퇴 안내</h1>
              <div>
                회원 탈퇴를 진행하시기 전에 안내 사항을 꼭 확인해주세요.
              </div>
            </div>
            <div>
              <b>
                사용하고 계신 아이디(
                <span style={{ color: '#1890FF' }}>{user.email}</span>)는 탈퇴할
                경우 재사용 및 복구가 불가능합니다.
              </b>
            </div>
            <div style={{ marginBottom: '32px' }}>
              <span style={{ color: '#FF4D50' }}>
                탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가
              </span>
              하오니 신중하게 선택하시기 바랍니다.
            </div>
            <div>
              <b>
                탈퇴 후 회원정보 및 개인형 서비스 이용기록은 모두 삭제됩니다.
              </b>
            </div>
            <div style={{ color: 'gray', marginBottom: '32px' }}>
              회원정보 및 게시글, 프로젝트 관리 등 서비스 이용기록은 모두
              삭제되며, 삭제된 데이터는 복구되지 않습니다.
            </div>
            <div style={{ color: '#ff4d50', marginBottom: '16px' }}>
              탈퇴 후 이메일 {user.email} 로 다시 가입이 가능하지만 기존
              데이터는 복구할 수 없습니다.
            </div>
            <div>
              <Button onClick={onCloseAccount} type="danger">
                회원 탈퇴하기
              </Button>
            </div>
          </div>
        )}
      </Wrap>
    </CloseContainer>
  );
}

export default CloseAccount;
