import React from 'react';
import { Switch, Route } from 'react-router-dom';

// antd
import { Layout } from 'antd';

// components
import Navbar from 'components/Navbar';
import Footer from 'components/Footer/index';

// pages
import Main from 'pages/Community/Main/index';
import SignUp from 'pages/Community/SignUp/index';
import CloseAccount from 'pages/Community/CloseAccount';
import ProjectDetail from 'pages/Community/ProjectDetail';
import MyPage from 'pages/Community/MyPage';
import ProjectList from 'pages/Community/ProjectList';
import ProjectWrite from 'pages/Community/ProjectWrite';
import ProjectEdit from 'pages/Community/ProjectEdit';
import FindPassword from 'pages/Community/FindPassword';
import CategoryFindResult from 'pages/Community/CategoryFindResult';
import Search from 'pages/Community/Search';
import Overview from 'pages/Manage/Overview';
import Projects from 'pages/Manage/Projects';
import TaskList from 'pages/Manage/TaskList';
import Timeline from 'pages/Manage/Timeline';
import Calendar from 'pages/Manage/Calendar';

function App() {
  let Navigation =
    window.location.pathname === '/user/signup' ? (
      ''
    ) : window.location.pathname === '/user/password' ? (
      ''
    ) : (
      <Navbar />
    );
  let FooterContainer =
    window.location.pathname === '/user/signup' ? (
      ''
    ) : window.location.pathname === '/user/project/1' ? (
      ''
    ) : window.location.pathname === '/user/password' ? (
      ''
    ) : (
      <Footer />
    );

  return (
    <Layout style={{ width: '100%', minWidth: '1400px' }}>
      {Navigation}
      <Switch>
        <Route path="/" exact component={Main} />

        <Route path="/user/signup" exact component={SignUp} />
        <Route path="/user/password" exact component={FindPassword} />
        <Route path="/user/closeaccount/:id" exact component={CloseAccount} />

        <Route path="/user/mypage/:id" exact component={MyPage} />

        <Route path="/project" exact component={ProjectList} />
        <Route path="/project/write" exact component={ProjectWrite} />

        <Route path="/project/detail/:id" exact component={ProjectDetail} />
        <Route path="/project/edit/:id" exact component={ProjectEdit} />
        <Route
          path="/project/category/:categoryName"
          exact
          component={CategoryFindResult}
        />
        <Route path="/search/:searchTerm" exact component={Search} />

        {/* Manage */}
        <Route path="/manage/projects" exact component={Projects} />
        <Route path="/manage/overview" exact component={Overview} />
        <Route path="/manage/tasklist" exact component={TaskList} />
        <Route path="/manage/timeline" exact component={Timeline} />
        <Route path="/manage/calendar" exact component={Calendar} />
      </Switch>
      {FooterContainer}
    </Layout>
  );
}

export default App;
