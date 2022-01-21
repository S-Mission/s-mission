import React from 'react';

// style
import { Background } from './style';

// component
import Inner from 'components/Main/Inner';
import PostContainer from 'components/Main/PostContainer';

function Main() {
  return (
    <div>
      <Background />
      <Inner />
      <PostContainer />
    </div>
  );
}

export default Main;
