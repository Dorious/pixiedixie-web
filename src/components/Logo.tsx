import React from "react";
import LogoSvg from "../../public/pixiedixie.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const transitionTime = "0.25s";

const LogoContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 122px; 
  transition: width ${transitionTime} ease-in-out;

  & svg {
    path {
      transition: all ${transitionTime} ease-in-out;
    }
  }

  & {
    .pix-2, .pix-3, .pix-4, .pix-5,
    .dix-2, .dix-3, .dix-4, .dix-5 {
      opacity: 0;
    }

    .and {
      transform: translateX(-17px); 
    }

    .dix-1 {
      transform: translateX(-20px); 
    }
  }

  @media (max-width: 360px) {
    & svg {
      height: 40px;
      margin-left: -25px;
    }
  }
`;

const ResponsiveContainer = styled(LogoContainer)`
  @media (min-width: 640px) {
    width: 250px;

    .pix-2, .pix-3, .pix-4, .pix-5,
    .dix-2, .dix-3, .dix-4, .dix-5 {
      opacity: 1;
    }

    .and, .dix-1 {
      transform: translateX(0); 
    }
  }
`

export interface ILogo {
  responsive?: boolean;
  svgStyle?: string;
  useLink?: boolean;
}

const Logo: React.FC<ILogo> = ({responsive, svgStyle, useLink}) => {
  const Container = styled(responsive ? ResponsiveContainer : LogoContainer)`
    & svg { ${svgStyle} }
  `

  const link = useLink ? <Link to="/"><LogoSvg /></Link> : <LogoSvg />

  return (
    <Container>
      {link}
    </Container>
  );
};

Logo.defaultProps = {
  useLink: true
};

export default Logo;