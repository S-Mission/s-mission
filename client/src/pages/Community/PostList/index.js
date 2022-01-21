import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OfficeContainer, CardContent, CardContainer, CardWrap } from './style';
import { Link } from 'react-router-dom';
import { readAllPostsAction } from 'redux/actions/post_actions';
import { Button, Spin } from 'antd';

function PostList() {
  const { postList, postCount, isLoading } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllPostsAction(0));
  }, [dispatch]);

  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);

  postCountRef.current = postCount - 12;

  const useOnScreen = (options) => {
    const lastPostElementRef = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          let remainPostCount = postCountRef.current - skipNumberRef.current;

          if (remainPostCount >= 0) {
            dispatch(readAllPostsAction(skipNumberRef.current + 12));
            skipNumberRef.current += 6;
          } else {
            endMsg.current = true;
          }
        }
      }, options);

      if (lastPostElementRef.current) {
        observer.observe(lastPostElementRef.current);
      }

      const LastElementReturnFunc = () => {
        if (lastPostElementRef.current) {
          observer.unobserve(lastPostElementRef.current);
        }
      };

      return LastElementReturnFunc;
    }, [lastPostElementRef, options]);

    return [lastPostElementRef];
  };

  const [lastPostElementRef] = useOnScreen({
    threshold: '0.5',
  });

  const postCard = postList
    ? postList.map((post, index) => {
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
      <div
        ref={lastPostElementRef}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {isLoading && <Spin tip="Loading..."></Spin>}
      </div>
      {isLoading ? (
        ''
      ) : endMsg ? (
        <Button style={{ width: '100%' }} type="danger">
          <div>더 이상의 게시글이 없습니다.</div>
        </Button>
      ) : (
        ''
      )}
    </OfficeContainer>
  );
}

export default PostList;
