import React, { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import ImageGallery from 'react-image-gallery';
import ChatImg from './chat.png';

// style
import {
  DetailContainer,
  Wrap,
  LeftSide,
  RightSide,
  EditDeleteContainer,
  Title,
  CategoryDateContainer,
  ContentContainer,
  CommentContainer,
  FileContainer,
  ChatImgContainer,
} from './style';
import { Button } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import {
  detailprojectAction,
  deleteprojectAction,
  loadviewAction,
  upviewAction,
} from 'redux/actions/project_actions';
import Comments from 'components/Comment/Comments';
import { Link } from 'react-router-dom';
import { loadcommentAction } from 'redux/actions/comment_actions';
import { deletecommentAction } from 'redux/actions/comment_actions';

function ProjectDetail(req) {
  const images = [];
  
  const { projectdetail, creator, is_project, category, preimages } =
    useSelector((state) => state.project);
  const { userId, userName } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  const { contents, date, previewImg, title, views } = projectdetail;
  const dispatch = useDispatch();
  const projectID = req.match.params.id;

  const data = {
    userID: userId,
    projectID: projectID,
  };

  useLayoutEffect(() => {
    dispatch(loadviewAction(data));
    dispatch(upviewAction(data));
    dispatch(loadcommentAction(projectID));
  }, [dispatch, projectID]);

  useEffect(() => {
    dispatch(detailprojectAction(projectID));
  }, [dispatch, projectID]);

  const listimage =  preimages
    ? preimages.map((item) => {
        images.push({
          original: `http://localhost:7000/${item}`,
          thumbnail: `http://localhost:7000/${item}`,
        });
      })
    : '';

  const onDeleteClick = (e) => {
    e.preventDefault();

    var result = window.confirm('글을 삭제하시겠습니까?');

    if (result) {
      const token = localStorage.getItem('token');
      const body = { token, projectID };

      dispatch(deleteprojectAction(body));

      req.history.push('1');
    }
  };

  const onCommentDeleteClick = useCallback(
    (commentId) => {
      var result = window.confirm('댓글을 삭제하시겠습니까?');

      if (result) {
        const data = {
          userId,
          commentId,
          projectId: projectID,
          token: localStorage.getItem('token'),
        };

        dispatch(deletecommentAction(data));
      }
    },
    [dispatch, userId, projectID],
  );

  // 글 수정, 삭제
  const EditDelete_Button = (
    <EditDeleteContainer>
      <Link to={`/project/edit/${projectID}`}>
        <Button>글 수정하기</Button>
      </Link>
      <Button
        onClick={onDeleteClick}
        type="danger"
        style={{ marginLeft: '4px' }}
      >
        글 삭제하기
      </Button>
    </EditDeleteContainer>
  );

  return (
    <DetailContainer>
      <Wrap>
        {is_project ? (
          <>
            <LeftSide>
              <Title>{title}</Title>
              <div>
                <CategoryDateContainer>
                  <div>
                    <Button type="primary">{category.categoryName}</Button>
                  </div>
                  <div>{date}</div>
                </CategoryDateContainer>
                <ContentContainer>
                  <div
                    style={{
                      textAlign: 'end',
                      color: 'gray',
                      marginBottom: '16px',
                    }}
                  >
                    <Link
                      to={`/user/mypage/${creator._id}`}
                      style={{ marginRight: '10px', color: 'black' }}
                    >
                      {creator.name}
                    </Link>
                    조회수 : {views}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: contents }}></div>
                  <div
                    style={{
                      marginTop: '32px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button onClick={() => (window.location.href = '/project')}>
                      목록
                    </Button>
                  </div>
                </ContentContainer>
                <CommentContainer>
                  <Comments
                    id={projectID}
                    userId={userId}
                    userName={userName}
                  />
                  <div
                    style={{
                      marginTop: '16px',
                    }}
                  >
                    {Array.isArray(comments)
                      ? comments.map((comment) => (
                          <div key={comment._id} style={{ padding: '16px 0' }}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div>
                                <Link
                                  to={`/user/mypage/${comment.creator}`}
                                  style={{ color: 'black' }}
                                >
                                  {comment.creatorName}
                                </Link>
                              </div>
                              <div style={{ color: 'gray' }}>
                                {comment.date}
                              </div>
                            </div>
                            <div
                              style={{
                                marginTop: '12px',
                                display: 'flex',
                                justifyContent: 'space-between',
                              }}
                            >
                              <div>{comment.contents}</div>
                              {comment.creator === userId ? (
                                <div
                                  style={{ cursor: 'pointer' }}
                                  onClick={() =>
                                    onCommentDeleteClick(comment._id)
                                  }
                                >
                                  삭제
                                </div>
                              ) : (
                                ''
                              )}
                            </div>
                          </div>
                        ))
                      : ''}
                  </div>
                </CommentContainer>
              </div>
            </LeftSide>
            <RightSide>
              {preimages ? (
                preimages.length > 0 ? (
                  <ImageGallery items={images} autoPlay />
                ) : (
                  ''
                )
              ) : (
                ''
              )}
              <FileContainer>
                {projectdetail.files ?
                  projectdetail.originalfileName.map((file, idx) => 
                    <div key={idx}>
                      <FolderOpenOutlined />
                      &nbsp;{projectdetail.originalfileName[idx]}
                    </div>
                  ): ""}
              </FileContainer>
              {userId === creator._id ? EditDelete_Button : <></>}
            </RightSide>
          </>
        ) : (
          <div>프로젝트가 존재하지 않습니다.</div>
        )}
      </Wrap>
      <ChatImgContainer>
        <Link to="/chat">
          <img
            src={ChatImg}
            style={{ width: '74px', height: '74px' }}
            alt="chat"
          />
        </Link>
      </ChatImgContainer>
    </DetailContainer>
  );
}

export default ProjectDetail;
