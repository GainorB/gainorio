import styled from 'styled-components';

export const MainNav = styled.ul`
  background: #090909;
  display: flex;
  position: fixed;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 20px;
  height: 100px;
  font-size: 1.1rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.24);
  width: 100%;
  z-index: 3;
  transition: all ease 0.5s;

  li {
    display: block;
    color: #fff;
    align-self: center;
    border-bottom: 3px solid #090909;
    padding: 1.4em;
    -webkit-transition: all 0.35s ease-in-out;
    -moz-transition: all 0.35s ease-in-out;
    -o-transition: all 0.35s ease-in-out;
    transition: all 0.25s ease-in-out;
  }

  li:hover {
    cursor: pointer;
    border-bottom: 3px solid #2649f0;
  }
`;