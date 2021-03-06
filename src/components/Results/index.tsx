import React, { ReactNode, useRef, useEffect, useState, useContext } from "react";
import { IImage, IImageSize } from "pixiedixie-api/dist/datasources/adapter";
import * as SC from "./Image";
import ImageComponent from "./Image";
import Loader from "./Loader";
import { AppContext } from "../../App";
import styled from "styled-components";

let scrollIsOn = false;
const threshold = 600;

/**
 * Fire lazy load of images;
 * @param results 
 * @param setResults 
 */
const fireLazyLoad = async (results: any, dispatch: React.Dispatch<{}>, onScrollEnd?: Function) => {
 if(typeof(onScrollEnd)  === "function") {
    const response = await onScrollEnd(results, dispatch);

    return dispatch({
      type: 'mergeResults',
      response
    });
  }
}

export interface IResults {
  title?: string|ReactNode;
  results: [];
  loading?: boolean;
  offset?: number;
  onScrollEnd?: Function;
}

const PlaceHolder = styled(SC.ImagesContainer)`
  position: absolute;
`

const Results: React.FC<IResults> = ({title, results, loading, offset, onScrollEnd}) => {
  const titleNode = title;
  const [state, dispatch] = useContext(AppContext);

  const scrollHandler = (event: Event, results: any, dispatch: React.Dispatch<{}>) => {
    if(scrollIsOn) return;
    if(!results || !results.length) return;

    const html = document.querySelector('html');

    if(window.innerHeight + html.scrollTop >= html.offsetHeight-threshold) {
      scrollIsOn=true;

      fireLazyLoad(results, dispatch, onScrollEnd)
        .then(() => {
          scrollIsOn=false;
        })
        .catch(() => {
          scrollIsOn=false;
        });
    }
  }

  // Need to pass setResults to scroll event
  const thisScrollHandler = (event: Event) => {
    return scrollHandler(event, results, dispatch);
  };

  useEffect(() => {
    if(document) {
      document.addEventListener("scroll", thisScrollHandler);
    }

    return () => {
      if(document) {
        document.removeEventListener("scroll", thisScrollHandler);
      }
    }
  });

  return (
    <>
      {titleNode ? <h1>{titleNode}</h1> : null}
      <Loader visible={loading || false} />
      <PlaceHolder>
        <SC.ImageContainer></SC.ImageContainer>
      </PlaceHolder>
      <SC.ImagesContainer>
        {results.map((image: object, index: number) => {
          // This sux but otherwise TS complained that `image` doesn't have shit
          const imgObj: IImage = JSON.parse(JSON.stringify(image));

          return (
            <SC.ImageContainer key={imgObj.pageUrl+index} href={imgObj.pageUrl} target="_blank">
              <ImageComponent image={imgObj} />
            </SC.ImageContainer>
          )
        })}
      </SC.ImagesContainer>
    </>
  )
}

export default React.memo(Results);