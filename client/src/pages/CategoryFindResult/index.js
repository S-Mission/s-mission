import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Col, Row } from 'antd';
import { CategoryContainer, CardContent } from './style';
import { Link, useParams } from 'react-router-dom';
import { CATEGORY_FIND_REQUEST } from 'redux/types/project_types';

function CategoryFindResult() {
  const dispatch = useDispatch();
  let { categoryName } = useParams();
  const { categoryFindResult } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryName]);

  const projectCard = categoryFindResult.projects ? (
    categoryFindResult.projects.map((project, index) => {
      var content = project.contents.replace(
        /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
        '',
      );
      return (
        <Col key={index} span={8}>
          <Link to={`/project/detail/${project._id}`}>
            <CardContent title={project.title}>
              <p>{project.creator.name}</p>
              <p>
                {content.length > 80 ? content.slice(0, 80) + ' ...' : content}
              </p>
            </CardContent>
          </Link>
        </Col>
      );
    })
  ) : (
    <div style={{ textAlign: 'center' }}>게시글이 존재하지 않습니다.</div>
  );

  return (
    <CategoryContainer>
      <Row>{projectCard}</Row>
    </CategoryContainer>
  );
}

export default CategoryFindResult;
