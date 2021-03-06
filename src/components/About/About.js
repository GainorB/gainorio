import React, { PureComponent } from 'react';
import { ThemeProvider } from 'styled-components';
import { AboutWrapper, SectionHeader, Section, Me } from '../Styled';

const theme = {
  fontColor: '#fff',
};

class About extends PureComponent {
  render() {
    return (
      <AboutWrapper>
        <ThemeProvider theme={theme}>
          <Section bg="#090909">
            <SectionHeader>me.</SectionHeader>
          </Section>
        </ThemeProvider>
        <Me>
          <h1>Hi. I'm Gainor, a full stack developer from New York.</h1>I am passionate about developing applications
          that will bring about change in peoples’ lives by utilizing my personal experiences, interests to provide
          unforgettable experiences. A lifelong learner dedicated to continuously learning and implementing new
          practices to perfect my craft and create innovative applications.
        </Me>
      </AboutWrapper>
    );
  }
}

export default About;
