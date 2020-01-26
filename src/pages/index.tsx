import React, { useEffect, useContext } from "react";
import { AppContext } from "../App";
import Results from "../components/Results";

const Search: React.FC = () => {
  const [{results, loading}, dispatch] = useContext(AppContext);

  useEffect(() => {
    console.log('index in')

    return () => {
      console.log('index outn')
    }
  });

  return <Results 
    results={results}
    loading={loading}
  />
};

export default Search;