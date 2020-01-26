import React, { useEffect, useRef} from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IImage, IImageSize } from "pixiedixie-api/dist/datasources/adapter";
import styled from "styled-components";

export interface IImageComponent {
  image: IImage;
}

export const ImagesContainer = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;

  @media (min-width: 640px) {
    flex-flow: wrap;
    justify-content: left;  
    margin: -10px;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 15px;
  background: #fff;

  & > a > img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (min-width: 640px) {
    height: 45vh;
    max-height: 270px;
    width: auto;
    display: flex;
    margin: 10px;

    & > a > img {
      width: auto;
      height: 100%;
    }
  }
`;

export const ImageAnchor = styled.a`
  box-shadow: 0 5px 12px rgba(0,0,0,0.1);
  &:hover {
    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  }
`
  
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

  return <ImageAnchor href={image.pageUrl} target="_blank">
    {Component}
  </ImageAnchor>
}

export default ImageComponent;