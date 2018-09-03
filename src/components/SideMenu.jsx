import React from 'react';
import Github from '../api/Github.jsx';
import GetInTouch from './GetInTouch.jsx';
import { ListGroup, SideMenu, SideMenuHeader } from './Styled';

const logo = require('../../assets/images/logo.jpeg');

const Feed = () => (
  <SideMenu>
    <div className="intro">
      <img className="avatar" src={logo} alt="" />
      <p className="name">Gainor Bostwick</p>
      <p className="title">Full Stack Web Developer</p>
    </div>
    <div className="nav">
      <SideMenuHeader>Menu</SideMenuHeader>
      <ListGroup>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Portfolio</li>
        <li>Experience</li>
      </ListGroup>
    </div>
    <div className="focusedOn">
      <SideMenuHeader>Currently Focused On</SideMenuHeader>
      <ListGroup>
        <li>React</li>
        <li>GraphQL</li>
        <li>Apollo Client</li>
        <li>Design Systems</li>
        <li>Crafting clean interfaces</li>
      </ListGroup>
    </div>
    <div className="twitter">
      <SideMenuHeader>Twitter Feed</SideMenuHeader>
    </div>
    {/* <div className="blog">
      <SideMenuHeader>From the blog</SideMenuHeader>
    </div> */}
    <div className="github">
      <SideMenuHeader>Github</SideMenuHeader>
      <Github />
    </div>
    <div className="inTouch">
      <SideMenuHeader>Stalk me</SideMenuHeader>
      <GetInTouch />
    </div>
    {/* <div className="instagram">
      <SideMenuHeader>instagram Feed</SideMenuHeader>
    </div> */}
  </SideMenu>
);

export default Feed;
