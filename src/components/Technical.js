import React, { Component, Fragment } from 'react';
import { debounce } from 'lodash';
// import FlipMove from 'react-flip-move';
import { v1 } from 'uuid';
import { ThemeProvider } from 'styled-components';
import Loading from './Loading';
import { SectionWrapper, SkillWrapper, SkillContainer, ReturnedResults } from './Styled';
import { mapTech } from '../utils';

const theme = {
  fontColor: '#fff',
};

class Technical extends Component {
  state = {
    loading: true,
    skills: [],
    displayedSkills: [],
    typing: false,
  };

  componentDidMount = async () => {
    const skills = await fetch('https://gainorportfolio.firebaseio.com/skills/.json').then(res => res.json());
    await this.setStateAsync({ skills, displayedSkills: skills, loading: false });
  };

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  filterSkills = debounce(query => {
    this.setState({
      displayedSkills: this.state.skills.filter(s => s.toLowerCase().includes(query)),
    });
  }, 700);

  handleChange = e => {
    const query = e.target.value.toLowerCase();
    this.filterSkills(query);
    if (e.target.value.length > 0) {
      this.setState({ typing: true });
    } else {
      this.setState({ typing: false });
    }
  };

  renderSkills = skills => {
    const output = skills.map(mapTech).map(t => (
      <SkillWrapper key={v1()}>
        <img src={t.src} alt={t.tech} />
        <span>{t.tech}</span>
      </SkillWrapper>
    ));

    return <SkillContainer>{output}</SkillContainer>;
  };

  render() {
    const { displayedSkills, loading, typing } = this.state;
    const { length } = displayedSkills;
    return (
      <Fragment>
        <ThemeProvider theme={theme}>
          <SectionWrapper bg="#090909">
            <input type="text" name="searchTerm" placeholder="technical." onChange={this.handleChange} />
            <ReturnedResults>
              Currently displaying {length} skill{length > 0 ? 's' : ''}.
            </ReturnedResults>
            {!typing && <p className="replace">replace 'technical' above with a technology to filter skills</p>}
          </SectionWrapper>
        </ThemeProvider>
        {loading ? <Loading /> : this.renderSkills(displayedSkills)}
      </Fragment>
    );
  }
}

export default Technical;