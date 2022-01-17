import React from 'react';
import { Right } from '../Overview/style';
import { Header } from './style';
import Left from 'components/ManageContainer/Left';
import { ManageContainer } from 'components/ManageContainer/style';

function Timeline() {
  return (
    <ManageContainer>
      <Left />
      <Right>
        <Header>
          <h2>Timeline</h2>&nbsp;&nbsp;
          <div>프로젝트명</div>
        </Header>
      </Right>
    </ManageContainer>
  );
}

export default Timeline;
