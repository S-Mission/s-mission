import React from 'react';
import { Right } from '../Overview/style';
import { Header, ListContainer, SearchBox } from './style';
import { Button } from 'antd';
import Left from 'components/ManageContainer/Left';
import { ManageContainer } from 'components/ManageContainer/style';

function TaskList() {
  return (
    <ManageContainer>
      <Left />
      <Right>
        <Header>
          <div>
            <h2>Task</h2>&nbsp;&nbsp;
            <div>프로젝트명</div>
          </div>
          <SearchBox />
        </Header>

        <ListContainer>
          <div>
            <h4>해야할 일</h4>
            <Button style={{ width: '100%' }}>+ Task 만들기</Button>
          </div>
          <div>
            <h4>진행 중</h4>
          </div>
          <div>
            <h4>완료</h4>
          </div>
        </ListContainer>
      </Right>
    </ManageContainer>
  );
}

export default TaskList;
