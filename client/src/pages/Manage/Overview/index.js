import React from 'react';
import { Link } from 'react-router-dom';
import { Description, Member, MemberList, Right } from './style';
import { ManageContainer } from 'components/ManageContainer/style';
import Left from 'components/ManageContainer/Left';

function Overview() {
  return (
    <ManageContainer>
      <Left />
      <Right>
        <h2>프로젝트명</h2>
        <Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
          <br />
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
          <br />
          <br />
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book.
        </Description>
        <Member>
          <h3>Member</h3>
          <MemberList>
            <Link to="">
              <img src="https://placeimg.com/40/40/people" alt="윤제혁" />
            </Link>
            <Link to="">
              <img src="https://placeimg.com/40/40/people" alt="한대찬" />
            </Link>
            <Link to="">
              <img src="https://placeimg.com/40/40/people" alt="이슬기" />
            </Link>
          </MemberList>
        </Member>
        <div>
          <h3>Due Date</h3>
          <div>2021. 10. 13 ~ 2022.2.24</div>
        </div>
      </Right>
    </ManageContainer>
  );
}

export default Overview;
