import React, { ReactNode, useRef, useEffect, useState, useContext } from "react";
import { IImage, IImageSize } from "pixiedixie-api/dist/datasources/adapter";
import * as SC from "./Image";
import ImageComponent from "./Image";
import Loader from "./Loader";
import { AppContext } from "../../App";
import styled from "styled-components";

let scrollIsOn = false;

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

const Results: React.FC<IResults> = ({title, results, loading, offset, onScrollEnd}) => {
  const titleNode = title || "Super images!"
  const [state, dispatch] = useContext(AppContext);

  const scrollHandler = (event: Event, results: any, dispatch: React.Dispatch<{}>) => {
    if(scrollIsOn) return;

    const html = document.querySelector('html');

    if(window.innerHeight + html.scrollTop >= html.offsetHeight-600) {
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

  const PlaceHolder = styled(SC.ImagesContainer)`
    position: absolute;
  `

  interface IImageExtended extends IImage {
    basisWidth: number,
    basisHeight: number
  }

  return (
    <>
      <h1>{titleNode}</h1>
      <Loader visible={loading || false} />
      <PlaceHolder>
        <SC.ImageContainer></SC.ImageContainer>
      </PlaceHolder>
      <SC.ImagesContainer>
        {results.map((image: object, index: number) => {
          // This sux but otherwise TS complained that `image` doesn't have shit
          const imgObj: IImageExtended = JSON.parse(JSON.stringify(image));

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