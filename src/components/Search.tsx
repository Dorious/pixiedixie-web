import React, { useContext, useState, useEffect, ChangeEvent } from "react";
import {__RouterContext} from "react-router";
import styled from "styled-components";
import SearchIcon from "../images/active-search.svg";
import { usePrevious, AppContext } from "../App";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;

  & > svg {
    position: absolute;
    height: 100%;
    left: 15px;
    width: 24px;
    top: 50%;
    margin-top: -12px;
    pointer-events: none;

    & > g {
      transform: scale(0.7);
    }
  }
`

const Input = styled.div`
  display: flex;
  width: 100%;

  & > input { box-sizing: border-box;
    background: transparent;
    margin: 0;
    padding: 0 10px 0 44px;
    border: 0;
    border-left: 1px solid #95004f;
    color: #ff0088;
    flex-grow: 1;

    &:focus {
      outline: 0;
      background: #fff;
    }
  }
`

const Search: React.FC<React.HTMLProps<HTMLInputElement>> = (props) => {
  const [searchValue, setSearchValue] = useState(props.value);
  const router = useContext(__RouterContext);
  const {history, location} = router;
  const historyPrev = usePrevious(Object.assign({}, history));
  let inputRef: any = null;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
    return props.onChange(event);
  }

  useEffect(() => {
    // Focus on start
    if(!historyPrev)
      inputRef.focus();
  });

  return (
    <SearchContainer>
      <Input>
        <input {...props} ref={(ref) => { inputRef = ref}} value={searchValue} onChange={onChange} />
      </Input>
      <SearchIcon />
    </SearchContainer>
  )
}

export default Search;