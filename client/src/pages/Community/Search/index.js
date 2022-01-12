import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Col, Row } from 'antd';
import {
  CardContainer,
  CardContent,
  CardWrap,
  Header,
  OfficeContainer,
} from './style';
import { Link, useParams } from 'react-router-dom';
import { searchAction } from 'redux/actions/project_actions';

function Search() {
  let { searchTerm } = useParams();

  const dispatch = useDispatch();
  const { searchResult, searchBy } = useSelector((state) => state.project);

  useEffect(() => {
    if (searchTerm) {
      dispatch(searchAction(searchTerm));
    }
  }, [dispatch, searchTerm]);

  const searchCard = Array.isArray(searchResult)
    ? searchResult.map((project, index) => {
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
      <Header>검색어 : {searchBy}</Header>
      <CardContainer>{searchCard}</CardContainer>
    </OfficeContainer>
  );
}

export default Search;
