import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce, groupBy } from 'lodash';
import {
  UnorderedList,
  BrowserHeader,
  BrowserWrapper,
  BrowserBookmarks,
  BrowserTop,
  Project,
  ProjectGallery,
  BrowserBar,
  ProjectHeadline,
  ProjectInformation,
  ProjectInnerGrid,
  ProjectContent,
  ProjectTitle,
  ProjectHeader,
  ProjectDescription,
  Dropdown,
  DropdownList,
} from '../Styled';
import Loading from '../../utils/Loading';
import ErrorMessage from '../../utils/ErrorMessage';
import { removeUnderline, key, removeWhiteSpace } from '../../utils';
import RenderTechnologies from '../../utils/RenderTechnologies';
import api from '../../api';
import ReturnHome from '../../utils/ReturnHome';

class CaseStudy extends PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired,
    showSideMenu: PropTypes.bool.isRequired,
  };

  state = {
    project: null,
    loading: true,
    projects: null,
    currentIndex: null,
    error: null,
    windowWidth: 0,
    openedBookmark: '',
    imageIndex: 0,
  };

  componentDidMount = async () => {
    // eslint-disable-next-line
    let { id, project } = this.props.match.params;
    project = removeUnderline(project);
    const projects = await api.projects();
    const currentProjects = projects.map((e, i) => i);
    const currentProjectNames = projects.map(e => e.name);
    const currentIndex = Number(id);
    if (currentProjects.includes(currentIndex) && currentProjectNames.includes(project)) {
      await this.setState({ project: projects[currentIndex], projects, loading: false, currentIndex });
    } else {
      await this.setState({ error: 'Invalid Project', loading: false });
    }
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentIndex, projects } = this.state;
    if (prevState.currentIndex !== currentIndex && prevState.currentIndex !== null) {
      this.props.history.push(`/case-study/${currentIndex}/${removeWhiteSpace(projects[currentIndex].name)}`);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = debounce(() => {
    this.setState({ windowWidth: window.innerWidth });
  }, 700);

  whichRepo = repoLink => {
    if (repoLink === '') return;
    const className = repoLink.includes('github') ? 'fab fa-github' : 'fab fa-bitbucket';
    // const where = repoLink.includes('github') ? 'Github' : 'Bitbucket';

    return (
      <a href={repoLink} target="_blank" rel="noopener noreferrer">
        <div>
          <i className={className} />
        </div>
      </a>
    );
  };

  toggleBookmark = (e, book) => {
    const selected = e.target.textContent;
    if (selected === '' || book === '') return this.setState({ openedBookmark: '' });
    this.setState({ openedBookmark: selected });
  };

  newProject = dir => {
    let { currentIndex } = this.state;
    const { projects } = this.state;
    switch (dir) {
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
  };

  newImage = dir => {
    let { imageIndex } = this.state;
    switch (dir) {
      case 'next':
        imageIndex += 1;
        break;
      case 'prev':
        imageIndex -= 1;
        break;
      default:
        break;
    }
    this.setState({ imageIndex });
  };

  renderCategories = projects => {
    const { project } = this.state;
    const { openedBookmark } = this.state;
    const categories = groupBy(projects, 'type');
    const output = ['Frontend', 'Backend', 'Fullstack'].map(b => {
      const className = b === project.type ? 'bookmark actualStack' : 'bookmark';
      const emptyClassName = categories[b] && categories[b].length !== 0 ? null : 'empty';
      return (
        <div
          className={`${className} ${emptyClassName}`}
          key={key()}
          role="presentation"
          onClick={
            categories[b] && categories[b].length !== 0
              ? e => this.toggleBookmark(e, b)
              : e => this.toggleBookmark(e, '')
          }
        >
          {categories[b] && categories[b].length !== 0 ? (
            <i className="fas fa-folder-open" />
          ) : (
            <i className="fas fa-folder" />
          )}{' '}
          <span>{b}</span>
          {openedBookmark === b && (
            <Dropdown>
              <DropdownList>
                {categories[b] &&
                  categories[b].map(p => (
                    <li
                      key={key()}
                      role="presentation"
                      onClick={() => this.setState({ project: projects[p.id], currentIndex: p.id })}
                    >
                      {p.name}
                    </li>
                  ))}
              </DropdownList>
            </Dropdown>
          )}
        </div>
      );
    });

    return <BrowserBookmarks>{output}</BrowserBookmarks>;
  };

  renderProject = project => {
    const { projects, currentIndex, windowWidth, imageIndex } = this.state;
    const { toggle, showSideMenu } = this.props;

    return (
      <BrowserWrapper>
        <BrowserTop>
          <BrowserHeader>
            <div className="dot dot-one" />
            <div className="dot dot-two" />
            <div className="dot dot-third" />
          </BrowserHeader>
          <BrowserBar>
            <div className="browseBar__miniGrid">
              <button onClick={() => this.newProject('prev')} disabled={currentIndex <= 0}>
                {currentIndex <= 0 ? <i className="fas fa-ban" /> : <i className="fas fa-arrow-left" />}
              </button>
              <button onClick={() => this.newProject('next')} disabled={currentIndex === projects.length - 1}>
                {currentIndex === projects.length - 1 ? (
                  <i className="fas fa-ban" />
                ) : (
                  <i className="fas fa-arrow-right" />
                )}
              </button>
              <ReturnHome />
            </div>
            <div className="browser__searchBar">
              <a href={project.resources[1]} target="_blank" rel="noopener noreferrer">
                {project.resources[1]}
              </a>
            </div>
            <div className="browseBar__miniGrid">
              {project.technologies.includes('React.js') && <i className="fab fa-react" />}
              {this.whichRepo(project.resources[0])}
              {windowWidth >= 1200 && (
                <button onClick={() => toggle('showSideMenu')}>
                  {showSideMenu ? <i className="fas fa-toggle-on" /> : <i className="fas fa-toggle-off" />}
                </button>
              )}
            </div>
          </BrowserBar>
          {this.renderCategories(projects)}
        </BrowserTop>
        <ProjectInformation>
          <ProjectTitle>{project.name}</ProjectTitle>
          <ProjectHeadline>{project.oneLiner}</ProjectHeadline>
          <ProjectDescription>{project.description}</ProjectDescription>
          <ProjectInnerGrid>
            <Project>
              <ProjectHeader>Technical Information</ProjectHeader>
              <ProjectContent>
                <UnorderedList>
                  {project.technicalInformation.map(f => (
                    <li className="techFeature" key={key()}>
                      {f}
                    </li>
                  ))}
                </UnorderedList>
              </ProjectContent>
            </Project>
            <Project>
              <ProjectHeader>Features</ProjectHeader>
              <ProjectContent>
                <UnorderedList>
                  {project.features.map(f => (
                    <li className="techFeature" key={key()}>
                      {f}
                    </li>
                  ))}
                </UnorderedList>
              </ProjectContent>
            </Project>
            <Project>
              <ProjectHeader>Powered by</ProjectHeader>
              <ProjectContent>
                <RenderTechnologies technologies={project.technologies} />
              </ProjectContent>
            </Project>
            {project.gallery.length > 1 && (
              <Project>
                <ProjectHeader>Gallery</ProjectHeader>
                <ProjectContent>
                  <ProjectGallery>
                    <div className="gallery">
                      {imageIndex === 0 ? null : (
                        <button onClick={() => this.newImage('prev')} disabled={imageIndex === 0}>
                          <i className="fas fa-angle-double-left" />
                        </button>
                      )}
                      <img src={project.gallery[imageIndex].src} alt={project.name} />
                      {imageIndex === project.gallery.length - 1 ? null : (
                        <button
                          onClick={() => this.newImage('next')}
                          disabled={imageIndex === project.gallery.length - 1}
                        >
                          <i className="fas fa-angle-double-right" />
                        </button>
                      )}
                    </div>
                    <div className="gallery__caption">
                      {project.gallery[imageIndex].caption === '' ? '' : project.gallery[imageIndex].caption}
                    </div>
                    <div className="gallery__count">
                      ({imageIndex}/{project.gallery.length - 1})
                    </div>
                  </ProjectGallery>
                </ProjectContent>
              </Project>
            )}
          </ProjectInnerGrid>
        </ProjectInformation>
      </BrowserWrapper>
    );
  };

  render() {
    const { project, loading, error } = this.state;
    if (error) return <ErrorMessage error={error} />;
    if (loading) return <Loading />;
    return this.renderProject(project);
  }
}

export default CaseStudy;
