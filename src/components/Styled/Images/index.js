import styled, { keyframes } from 'styled-components';

export const Avatar = styled.div`
  img {
    width: ${props => props.size && props.size};
    height: ${props => props.size && props.size};
    border-radius: 50% !important;
    margin-bottom: 20px;
    display: block;
    margin: auto;
    user-select: none;
    border: 1px solid #e9ecef;
  }

  img:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

export const SocialIconsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const SocialIcon = styled.span`
  i {
    opacity: 0.5;
    transition: all 500ms;
    padding: 10px;
    font-size: 1.7rem;
    ${props => props.resume && `color: #fcc846`};
    ${props => props.linkedin && `color: #0577b2`};
    ${props => props.email && `color: #ba4444`};
    ${props => props.github && `color: #24292e`};
    ${props => props.twitter && `color: #1e95dc`};
  }

  i:hover {
    color: #fff;
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const LoadingImage = styled.div`
  display: block;
  animation: ${rotate360} 2s linear infinite;
  margin: 0 auto;
  text-align: center;
  width: 50px;
  height: 50px;

  img {
    margin: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
