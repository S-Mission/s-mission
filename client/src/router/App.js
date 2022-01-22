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
import PostDetail from 'pages/Community/PostDetail';
import MyPage from 'pages/Community/MyPage';
import PostList from 'pages/Community/PostList';
import PostWrite from 'pages/Community/PostWrite';
import PostEdit from 'pages/Community/PostEdit';
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

        <Route path="/post" exact component={PostList} />
        <Route path="/post/write" exact component={PostWrite} />

        <Route path="/post/detail/:id" exact component={PostDetail} />
        <Route path="/post/edit/:id" exact component={PostEdit} />
        <Route
          path="/post/category/:categoryName"
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
