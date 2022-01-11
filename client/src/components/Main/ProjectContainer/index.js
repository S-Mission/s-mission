import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'antd';

// style
import { OfficeContainer, CardContent, CardContainer, CardWrap } from './style';

import { readprojectAction } from 'redux/actions/project_actions';
import { Link } from 'react-router-dom';

function ProjectContainer() {
  const { projects } = useSelector((state) => state.project);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(readprojectAction(0));
  }, [dispatch]);

  const projectCard = projects
    ? projects.slice(0, 9).map((project, index) => {
        var content = project.contents.replace(
          /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
          '',
        );
        return (
          <CardWrap key={index}>
            <Link to={`/project/detail/${project._id}`}>
              <CardContent title={project.title}>
                <p>{project.creator.name}</p>
                <p>
                  {content.length > 80
                    ? content.slice(0, 80) + ' ...'
                    : content}
                </p>
              </CardContent>
            </Link>
          </CardWrap>
        );
      })
    : '';

  return (
    <OfficeContainer>
      <CardContainer>{projectCard}</CardContainer>
      <a href="/project">
        <Button type="primary">더보기</Button>
      </a>
    </OfficeContainer>
  );
}

export default ProjectContainer;
