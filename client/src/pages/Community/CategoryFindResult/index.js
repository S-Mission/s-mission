import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Col, Row } from 'antd';
import {
  CategoryContainer,
  CardContent,
  CardContainer,
  CardWrap,
} from './style';
import { Link, useParams } from 'react-router-dom';
import { CATEGORY_FIND_REQUEST } from 'redux/types/post_types';

function CategoryFindResult() {
  const dispatch = useDispatch();
  let { categoryName } = useParams();
  const { categoryFindResult } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryName]);

  const postCard = categoryFindResult.posts ? (
    categoryFindResult.posts.map((post, index) => {
      var content = post.contents.replace(
        /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
        '',
      );
      return (
        <CardWrap key={index}>
          <Link to={`/post/detail/${post._id}`}>
            <CardContent title={post.title}>
              <p>{post.creator.name}</p>
              <p>
                {content.length > 80 ? content.slice(0, 80) + ' ...' : content}
              </p>
            </CardContent>
          </Link>
        </CardWrap>
      );
    })
  ) : (
    <div style={{ textAlign: 'center' }}>게시글이 존재하지 않습니다.</div>
  );

  return (
    <CategoryContainer>
      <CardContainer>{postCard}</CardContainer>
    </CategoryContainer>
  );
}

export default CategoryFindResult;
