import React from 'react';
import { Button, Table } from 'antd';
import { ProjectsContainer, ProjectsHeader, SearchBox } from './style';

const columns = [
  {
    title: '이름',
    dataIndex: 'name',
  },
  {
    title: '설명',
    dataIndex: 'description',
  },
  {
    title: '팀원',
    dataIndex: 'member',
  },
];
const data = [
  {
    key: '1',
    name: 'S-Mission',
    description: '사이드 프로젝트 관리 및 커뮤니티 서비스',
    member: '윤제혁, 한대찬, 이슬기',
  },
  {
    key: '2',
    name: 'Memories',
    description: '국가 유공자 분들을 위한 웹앨범 서비스',
    member: '윤제혁, 한대찬, 이슬기',
  },
];

function Projects() {
  return (
    <ProjectsContainer>
      <ProjectsHeader>
        <div>
          <h2>프로젝트</h2>
          <Button>프로젝트 만들기</Button>
        </div>
        <div>
          <SearchBox placeholder="Search" />
        </div>
      </ProjectsHeader>
      <Table columns={columns} dataSource={data} size="small" />
    </ProjectsContainer>
  );
}

export default Projects;
