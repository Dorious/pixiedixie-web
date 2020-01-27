import React, { useEffect, useContext, useReducer, useRef } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components';
import {__RouterContext} from "react-router";
import querystring from "querystring";

import Header from "./components/Header";
import reducer from "./reducer";
import SearchPage from "./pages/search";

const GlobalStyle = createGlobalStyle`
  html {
    min-height: 100%;
  }

  body {
    margin: 0;
    background: #eee;
  }

  body, input, textarea, td {
    font-family: Arial, Helvetica, sans-serif;
    font-family: 13px;
  }

  h1 {
    font-size: 120%;
    font-weight: Normal;
    color: #ff0088;
    margin: 0 0 10px;

    @media (min-width: 800px) {
      font-size: 150%;
    }
  }
`

const AppBody = styled.div`
  margin: 58px 20px 250px 20px;
  overflow: hidden;
`

const location = window.location;
const locationSearch = querystring.parse(location.search.substr(1, location.search.length)); 

export const AppContext = React.createContext(null);
AppContext.displayName = "AppContext";

export const initialState: any = {
  searchValue: locationSearch.q ? locationSearch.q.toString() : '',
  datasources: [],
  selectedDatasources: [],
  loading: false,
  results: [],
  resultsSearchValue: '',
  offset: 0,
  count: 25,
  totalCount: 0,
  requestError: null,
  showError: false
}

export interface IAppProvider {
  reducer: any;
  initialState: any;
  children: any;
}

export const AppProvider = ({reducer, initialState, children}: IAppProvider) =>(
  <AppContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppContext.Provider>
);
export const useStateValue = () => useContext(AppContext);
export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <AppProvider reducer={reducer} initialState={initialState}>
      <Router>
        <Header />
        <AppBody>
          <Route path="/" exact component={SearchPage} />
          <Route path="/search" component={SearchPage} />
        </AppBody>
      </Router>
    </AppProvider>
  </>
);

export default App;