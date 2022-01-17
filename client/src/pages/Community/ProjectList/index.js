import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OfficeContainer, CardContent, CardContainer, CardWrap } from './style';
import { Link } from 'react-router-dom';
import { readAllProjectsAction } from 'redux/actions/project_actions';
import { Button, Spin } from 'antd';

function ProjectList() {
  const { projectList, projectCount, isLoading } = useSelector(
    (state) => state.project,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readAllProjectsAction(0));
  }, [dispatch]);

  const skipNumberRef = useRef(0);
  const projectCountRef = useRef(0);
  const endMsg = useRef(false);

  projectCountRef.current = projectCount - 12;

  const useOnScreen = (options) => {
    const lastProjectElementRef = useRef();

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          let remainProjectCount =
            projectCountRef.current - skipNumberRef.current;

          if (remainProjectCount >= 0) {
            dispatch(readAllProjectsAction(skipNumberRef.current + 12));
            skipNumberRef.current += 6;
          } else {
            endMsg.current = true;
          }
        }
      }, options);

      if (lastProjectElementRef.current) {
        observer.observe(lastProjectElementRef.current);
      }

      const LastElementReturnFunc = () => {
        if (lastProjectElementRef.current) {
          observer.unobserve(lastProjectElementRef.current);
        }
      };

      return LastElementReturnFunc;
    }, [lastProjectElementRef, options]);

    return [lastProjectElementRef];
  };

  const [lastProjectElementRef] = useOnScreen({
    threshold: '0.5',
  });

  const projectCard = projectList
    ? projectList.map((project, index) => {
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
      <div
        ref={lastProjectElementRef}
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

export default ProjectList;
