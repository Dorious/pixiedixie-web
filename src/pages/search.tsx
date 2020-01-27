import React, { useEffect, useContext, useRef } from "react";
import { AppContext, usePrevious } from "../App";
import Results from "../components/Results";
import { __RouterContext, RouteComponentProps } from "react-router";
import axios from "axios";
import querystring from "query-string";
import styled from "styled-components";
import styles from "../styles";
import Logo from "../components/Logo";

const DoSearch = async (router: RouteComponentProps, loading: boolean, dispatch: any, offset?: string, count?:  string) => {
  // Show loader
  if(!loading) dispatch({type: 'showLoader'});

  // Parse query
  const params = querystring.parse(router.location.search);
  let url = "/api/v1/images";

  if(params.q) {
    url = "/api/v1/search";
  }

  params.offset = offset;
  params.count = count;

  // Do ajax for data
  const result = await axios(url, {
    params,
  });

  return Promise.resolve(result);
};

export interface IErrorMessage {
  error: Error;
}

export const ErrorContainer = styled.div`
  position: fixed;
  z-index: 10;
  padding: 20px 40px;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
  margin-top: 10%;
  margin-left: 35%;
`

export const Sad = styled.div`
  transform: rotate(45deg);
  display: inline-block;
  color: ${styles.pink};

  &::after {
    content: ';(';
    font-size: 800%;
  }
`

export const LogoContainer = styled.div`
  position: absolute;
  top: 42px;
  transform: scale(1.3) rotate(4deg);
  right: 21%;
`

export const ErrorMessage: React.FC<IErrorMessage> = ({error}) => {
  return error ? <ErrorContainer>
    <Sad />
    <LogoContainer>
      <Logo />
    </LogoContainer>
    {error.message}
  </ErrorContainer> : null
}

const Search: React.FC<RouteComponentProps> = (router) => {
  const [{
    searchValue, results, loading, offset, count, requestError, resultsSearchValue,
    totalCount
  }, dispatch] = useContext(AppContext);

  const {history, location} = router;
  const historyPrevious = usePrevious(Object.assign({}, history));
  const qs = querystring.parse(location.search);

  let title = "Trending images";

  if(resultsSearchValue) 
    title = `Found ${totalCount} results for "${resultsSearchValue}"...`;

  // Remove the title when no results and it's loading
  if(!results.length && loading)
    title = null;

  useEffect(() => {
    if(JSON.stringify(history) !== JSON.stringify(historyPrevious)) {
      // This is ugly here but scroll to the top
      if(window)
        window.scrollTo(0, 0);

      DoSearch(router, loading, dispatch, offset, count)
        .then((data) => {
          dispatch({
            type: "setResults",
            response: data.data,
            resultsSearchValue: qs.q 
          });
        }).catch((reason) => {
          dispatch({
            type: "requestError",
            error: reason,
          });
        });
    }
  });

  return <>
    <ErrorMessage error={requestError} />
    <Results 
      results={results} 
      loading={loading}
      title={title}
      onScrollEnd={async (results: any, dispatch: React.Dispatch<{}>) => {
        const newOffset = offset+count;
        const response = await DoSearch(router, true, dispatch, newOffset, count).catch((reason) => {
          dispatch({
            type: "requestError",
            error: reason,
          });
        });
        return Promise.resolve(response);
      }}
    />
  </>;
};

export default React.memo(Search);