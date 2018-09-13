import React, { Component } from 'react';
import { v1 } from 'uuid';
import PropTypes from 'prop-types';
import {
  StudyGrid,
  StudySplash,
  StudyContainer,
  StudyButton,
  StudyContent,
  Study,
  StudyHeader,
  StudyInner,
  StudyGallery,
  GalleryGrid,
  ListGroup,
  StudyTech,
  ButtonGrid,
  PrevButton,
  NextButton,
} from '../components/Styled';
import Loading from './Loading';
import InvalidProject from './InvalidProject';

class CaseStudy extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    project: null,
    loading: true,
    projects: null,
    currentIndex: null,
    error: null,
  };

  async componentDidMount() {
    const projects = await fetch('https://gainorportfolio.firebaseio.com/projects/.json').then(res => res.json());
    const currentProjects = projects.map((e, i) => i);
    const currentIndex = Number(this.props.match.params.id);
    if (currentProjects.includes(currentIndex)) {
      await this.setStateAsync({ project: projects[currentIndex], projects, loading: false, currentIndex });
    } else {
      await this.setStateAsync({ error: 'Invalid Project', loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentIndex, projects } = this.state;
    if (prevState.currentIndex !== currentIndex && prevState.currentIndex !== null) {
      this.props.history.push(`/case-study/${currentIndex}/${projects[currentIndex].name}`);
    }
  }

  setStateAsync(state) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }

  newProject = key => {
    let { currentIndex } = this.state;
    const { projects } = this.state;
    const max = projects.length;
    if (currentIndex !== max || currentIndex !== -1) {
      switch (key) {
        case 'next':
          currentIndex += 1;
          break;
        case 'prev':
          currentIndex -= 1;
          break;
        default:
          break;
      }
      this.setState({ project: projects[currentIndex], currentIndex });
    }
  };

  renderProject = project => {
    const { projects, currentIndex } = this.state;
    return (
      <StudyGrid>
        <StudySplash>
          <span>{project.name}</span>
        </StudySplash>

        <StudyContainer>
          <Study>
            <StudyHeader>About the Project</StudyHeader>
            <StudyContent>
              {project.description}
              <p>
                <a href={project.resources[0]} target="_blank" rel="noopener noreferrer">
                  <StudyButton>
                    <i className="fab fa-github" />
                    <span>View Repo</span>
                  </StudyButton>
                </a>

                <a href={project.resources[1]} target="_blank" rel="noopener noreferrer">
                  <StudyButton>
                    <i className="fas fa-plug" />
                    <span>View Online</span>
                  </StudyButton>
                </a>
              </p>
            </StudyContent>
          </Study>
          <StudyInner>
            <Study>
              <StudyHeader>Technical Information</StudyHeader>
              <StudyContent>
                <ol>{project.technicalInformation.map(f => <li key={v1()}>{f}</li>)}</ol>
              </StudyContent>
              <StudyHeader>Powered by</StudyHeader>
              <StudyContent>
                <ListGroup>{project.technologies.map(t => <StudyTech key={v1()}>{t}</StudyTech>)}</ListGroup>
              </StudyContent>
            </Study>
            <Study>
              <StudyHeader>Features</StudyHeader>
              <StudyContent>
                <ol>{project.features.map(f => <li key={v1()}>{f}</li>)}</ol>
              </StudyContent>
            </Study>
          </StudyInner>
        </StudyContainer>
        {project.gallery.length > 1 && (
          <GalleryGrid>
            <StudyHeader>Gallery</StudyHeader>
            <StudyGallery>
              {project.gallery.map(p => (
                <div key={v1()}>
                  <img src={p} alt={project.name} />
                </div>
              ))}
            </StudyGallery>
          </GalleryGrid>
        )}
        <ButtonGrid>
          <PrevButton onClick={() => this.newProject('prev')} disabled={currentIndex <= 0}>
            Previous Project
          </PrevButton>
          <NextButton onClick={() => this.newProject('next')} disabled={currentIndex === projects.length - 1}>
            Next Project
          </NextButton>
        </ButtonGrid>
      </StudyGrid>
    );
  };

  render() {
    const { project, loading, error } = this.state;
    if (loading) {
      return <Loading />;
    } else if (error) {
      return <InvalidProject error={error} />;
    }
    return this.renderProject(project);
  }
}

export default CaseStudy;
