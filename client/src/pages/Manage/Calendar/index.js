import React from 'react';
import { ManageContainer } from 'components/ManageContainer/style';
import { Right } from '../Overview/style';
import { Header } from './style';
import Left from 'components/ManageContainer/Left';

function Calendar() {
  return (
    <ManageContainer>
      <Left />
      <Right>
        <Header>
          <h2>Calendar</h2>&nbsp;&nbsp;
          <div>프로젝트명</div>
        </Header>
      </Right>
    </ManageContainer>
  );
}

export default Calendar;
