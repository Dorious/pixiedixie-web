import React, { useEffect, useRef} from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IImage, IImageSize } from "pixiedixie-api/dist/datasources/adapter";
import styled from "styled-components";

export interface IImageComponent {
  image: IImage;
}

export const responsiveWidth = '800px';

export const ImagesContainer = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;

  @media (min-width: ${responsiveWidth}) {
    flex-flow: wrap;
    align-items: stretch;
    justify-content: space-between;
    margin: -10px;
  }
`;

export const ImageContainer = styled.a`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0 5px 12px rgba(0,0,0,0.1);
  display: block;

  &:hover {
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }

  & img {
    width: 100%;
    height: auto;
    display: inline-block;
  }

  @media (min-width: ${responsiveWidth}) {
    height: 26vh;
    min-height: 100px;
    width: auto;
    display: flex;
    margin: 10px;

    & > a {
      display: inline-block;
    }

    & img {
      width: auto;
      height: 100%;
    }
  }
`;

export const ImageAnchor = styled.a``
  
const ImageComponent: React.FC<IImageComponent> = ({image}) => {
  const img = image.images[0];
  let Component;

  if(image.images.length > 1) {
    Component = <LazyLoadImage 
      src={img.url} 
      width={img.width}
      srcSet={null}
      height={img.height}
    />
  } else {
    Component = <LazyLoadImage 
      src={img.url}
      width={img.width}
      height={img.height}
    />
  }

  return Component
}

export default React.memo(ImageComponent);