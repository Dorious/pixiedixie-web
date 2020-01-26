import React, { ChangeEvent, KeyboardEvent, useState, useContext, useEffect } from "react";
import Logo from "./Logo";
import Search from "./Search";
import styled from "styled-components";
import {__RouterContext} from "react-router";
import { AppContext } from "../App";

const HeaderContainer = styled.div`
  margin: 0;
  background: rgba(255,255,255,0.9);
  position: fixed;
  box-shadow: 0 5px 10px rgba(0,0,0,0.2);
  top: 0;
  width: 100%;
  z-index: 2;
`

const HeaderNode = styled.header`
  margin: 0 -10px;
  padding: 0 20px;
  display: flex;
`

export const DEFAULT_TIMEOUT=1000;
let timeout: any = null;

const Header: React.FC = () => {
  const [state, dispatch] = useContext(AppContext);
  const router = useContext(__RouterContext);

  const onChange = (value: string, timeoutTime = DEFAULT_TIMEOUT) => {
    if(timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      const url = value ? `/search?q=${escape(value)}` : `/`;
      router.history.push(url);

      dispatch({
        type: 'setSearchValue',
        value
      })
    }, timeoutTime);
  };

  return (
    <HeaderContainer>
      <HeaderNode>
        <Logo 
          responsive={true} 
          svgStyle="margin: -3px 0 -12px;"
        />
        <Search 
          value={state.searchValue} 
          onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => {
            if(event.key === "Enter")
              onChange(event.currentTarget.value, 0);
          }}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChange(event.currentTarget.value);
          }} 
          onBlur={() => {
            if(timeout) clearTimeout(timeout);
          }}
          onFocus={() => {
            if(timeout) clearTimeout(timeout);
          }}
          placeholder="The ultimate search!" 
        />
      </HeaderNode>
    </HeaderContainer> 
  );
};

export default Header;