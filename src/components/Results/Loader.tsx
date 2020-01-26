import * as React from 'react';
import styled from 'styled-components';
import Logo from '../Logo';

interface ILoader {
  visible: boolean;
}

const Loader: React.FC<ILoader> = ({visible}) => {
    
  const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(255,255,255,0.8);
    z-index: 1;
    ${!visible ? "display:none;": ""}

    & > div {
      position: absolute;
      top: 50%;
      margin-top: -28px;
      left: 50%;
      margin-left: -60px;
    }
  `
  return <Container>
    <Logo responsive={false} />
  </Container>;
};

export default Loader;
