import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 400px 5fr;

  .relativelyPositioned {
    position: relative;
  }

  .sidebar {
    opacity: ${props => (props.showSideMenu ? '1' : '0')};
    visibility: ${props => (props.showSideMenu ? 'visible' : 'hidden')};
    position: absolute;
    grid-area: 'sidebar';
    max-height: 100vh;
    -moz-transition: all 0.8s ease;
    transition: all 0.8s ease;
  }

  .miniWrapper {
    position: absolute;
    grid-area: 'main';
    max-height: 100vh;
    left: ${props => (props.showSideMenu ? `0` : `-400px`)};
    -moz-transition: left 0.8s ease;
    transition: left 0.8s ease;
  }

  @media only screen and (max-width: 1200px) {
    grid-template-columns: 100%;
    grid-template-areas: 'sidebar' 'main';

    .sidebar {
      grid-area: 'sidebar';
      max-height: none;
    }

    .miniWrapper {
      max-height: none;
      grid-area: 'main';
    }
  }
`;

export const SkillWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;
  padding: 1em;
`;

export const AboutWrapper = styled.div`
  margin-top: 99px;

  @media only screen and (max-width: 1200px) {
    margin-top: 213px;
  }
`;

export const PortfolioWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 10px;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
  padding: 1em;
`;

export const PerfectlyCentered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  font-size: inherit;
  padding: 20px 0px;
`;
