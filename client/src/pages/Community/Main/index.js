import React from 'react';

// style
import { Background } from './style';

// component
import Inner from 'components/Main/Inner';
import ProjectContainer from 'components/Main/ProjectContainer';

function Main() {
  return (
    <div>
      <Background />
      <Inner />
      <ProjectContainer />
    </div>
  );
}

export default Main;
