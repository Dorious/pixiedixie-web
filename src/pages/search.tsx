import React, { useEffect, useContext, useRef } from "react";
import { AppContext, usePrevious } from "../App";
import Results from "../components/Results";
import { __RouterContext, RouteComponentProps } from "react-router";
import axios from "axios";
import querystring from "querystring";

const DoSearch = async (router: RouteComponentProps, loading: boolean, dispatch: any, offset?: string, count?:  string) => {
  // Show loader
  if(!loading) dispatch({type: 'showLoader'});

  // Parse query
  const params = querystring.parse(router.location.search.substr(1, router.location.search.length));
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

const Search: React.FC<RouteComponentProps> = (router) => {
  const [{results, loading, offset, count}, dispatch] = useContext(AppContext);
  const {history, location} = router;
  const historyPrevious = usePrevious(Object.assign({}, history));

  const title = "Trending images";

  useEffect(() => {
    if(JSON.stringify(history) !== JSON.stringify(historyPrevious)) {
      DoSearch(router, loading, dispatch, offset, count)
        .then((data) => {
          dispatch({
            type: "setResults",
            response: data.data
          });
        }).catch((reason) => {
          dispatch({
            type: "requestError",
            error: "",
          });
        });
    }
  });

  return <Results 
    results={results} 
    loading={loading}
    title={title}
    onScrollEnd={async (results: any, dispatch: React.Dispatch<{}>) => {
      let newOffset = offset+count;
      let response = await DoSearch(router, true, dispatch, newOffset, count);
      return Promise.resolve(response);
    }}
  />;
};

export default React.memo(Search);