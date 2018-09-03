import React from 'react';
import PortfolioData from './api/PortfolioData.jsx';
// import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
// import Home from './components/Home.jsx';
import Introduction from './components/Introduction.jsx';
import Portfolio from './components/Portfolio.jsx';
import SideMenu from './components/SideMenu.jsx';
import { PageWrapper } from './components/Styled';

const App = () => (
  <PageWrapper>
    <div className="sidebar">
      <SideMenu />
    </div>
    <div className="miniWrapper">
      {/* <Header /> */}
      <Introduction />
      <Portfolio />
      <PortfolioData />
      {/* <Route path="/" exact component={Home} /> */}
      <Contact />
      <Footer />
    </div>
  </PageWrapper>
);

// App.PropTypes {}

export default App;
