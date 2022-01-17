import React from 'react';
import { Link } from 'react-router-dom';
import { LeftSide } from './style';

function Left() {
  return (
    <LeftSide>
      <div>
        <Link to="/manage/overview">Overview</Link>
      </div>
      <div>
        <Link to="/manage/tasklist">Task List</Link>
      </div>
      <div>
        <Link to="/manage/timeline">Timeline</Link>
      </div>
      <div>
        <Link to="/manage/calendar">Calendar</Link>
      </div>
      <div>
        <Link to="">Chatting</Link>
      </div>
    </LeftSide>
  );
}

export default Left;
