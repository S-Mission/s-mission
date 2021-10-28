import React, { useLayoutEffect } from 'react';
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

// antd
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  detailprojectAction,
  deleteprojectAction,
} from 'redux/actions/project_actions';
import { Link } from 'react-router-dom';

// 이미지 변경해야함
const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

function ProjectDetail(req) {
  const { projectdetail, creator, is_project, category } = useSelector(
    (state) => state.project,
  );
  const { userId } = useSelector((state) => state.auth);

  const { contents, date, previewImg, title } = projectdetail;
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(detailprojectAction(req.match.params.id));
  }, [dispatch, req.match.params.id]);

  const categoryList = category
    ? category.map((cate, index) => {
        return (
          <span key={index}>
            <Button
              type="primary"
              style={{ width: '70px', marginRight: '4px' }}
            >
              {cate.categoryName}
            </Button>
          </span>
        );
      })
    : '';

  const imageList = previewImg
    ? previewImg.map((item, index) => {
        return (
          <div key={index}>
            <img src={`http://localhost:7000/${item}`} />
          </div>
        );
      })
    : '';

  const onEditClick = (e) => {
    e.preventDefault();

    const projectID = req.match.params.id;
    window.location.pathname = `/project/edit/${projectID}`;
  };

  const onDeleteClick = () => {
    const token = localStorage.getItem('token');
    const projectID = req.match.params.id;
    const body = { token, projectID };
    deleteprojectAction(body);
  };

  // 글 수정, 삭제
  const EditDelete_Button = (
    <EditDeleteContainer>
      <Button onClick={onEditClick}>글 수정하기</Button>
      <Button onClick={onDeleteClick} type="danger">
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
                  <div>{categoryList}</div>
                  <div>{date}</div>
                </CategoryDateContainer>
                {/* <h4>{creator.name}</h4> */}
                <ContentContainer>
                  <div dangerouslySetInnerHTML={{ __html: contents }}></div>
                </ContentContainer>
                <CommentContainer>
                  <h2>
                    <b>COMMENTS</b>
                  </h2>
                  <input placeholder="댓글을 작성해주세요." />
                </CommentContainer>
              </div>
            </LeftSide>
            <RightSide>
              <ImageGallery items={images} autoPlay />
              <FileContainer>
                <div>파일이 들어갈 공간입니다.</div>
                <div>파일이 들어갈 공간입니다.</div>
                <div>파일이 들어갈 공간입니다.</div>
                <div>파일이 들어갈 공간입니다.</div>
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
          <img src={ChatImg} style={{ width: '74px', height: '74px' }} />
        </Link>
      </ChatImgContainer>
    </DetailContainer>
  );
}

export default ProjectDetail;
