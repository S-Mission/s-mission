import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'antd';

// style
import { OfficeContainer, CardContent, CardContainer, CardWrap } from './style';

import { readpostAction } from 'redux/actions/post_actions';
import { Link } from 'react-router-dom';

function PostContainer() {
  const { posts } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(readpostAction());
  }, [dispatch]);

  const postCard = posts
    ? posts.slice(0, 9).map((post, index) => {
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
      <CardContainer>{postCard}</CardContainer>
      <a href="/post">
        <Button type="primary">더보기</Button>
      </a>
    </OfficeContainer>
  );
}

export default PostContainer;
