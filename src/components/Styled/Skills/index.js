import styled from 'styled-components';

export const Skill = styled.div`
  user-select: none;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: 10px;
  border: 2px solid #090909;
  padding: 1em;
  text-shadow: 0 2px 0 rgba(0, 0, 0, 0.07);
  -webkit-transition: all 0.1s ease-in-out, 0.8s;
  -moz-transition: all 0.1s ease-in-out, 0.8s;
  -o-transition: all 0.1s ease-in-out, 0.8s;
  transition: all 0.1s ease-in-out, 0.8s;
  ${props =>
    props.stack &&
    `background: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(https://res.cloudinary.com/dplvzflkc/image/upload/v1538266584/portfolio/fiyah.png);
    background-size: 70% 70%;
    background-position: center;
    `};

  .skill__rows {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
  }

  .skill__projectCount {
    text-align: center;
    font-size: 0.9rem;
    padding: 10px;
    background: #090909;
    color: #fff;
  }

  .skill__projectCount a {
    color: #fff;
  }

  img {
    width: 100%;
    max-height: 100px;
    object-fit: contain;
  }

  .skill__Tech {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }

  &:hover {
    transform: scale(1.04, 1.04);
  }
`;

export const SkillContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-gap: 10px;
  padding: 1em;
`;
