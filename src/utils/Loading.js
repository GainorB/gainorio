import React from 'react';
import { PerfectlyCentered } from '../components/Styled';

const style = {
  fontSize: '1rem',
};

const Loading = () => (
  <PerfectlyCentered>
    <span style={style}>Loading..</span>
  </PerfectlyCentered>
);

export default Loading;