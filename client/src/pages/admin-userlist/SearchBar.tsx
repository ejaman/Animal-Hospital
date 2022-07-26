import React, { useRef, useState } from "react";
import styled from "styled-components";
const SearchContainer = styled.form`
  display: flex;
  margin-left: auto;
`;
const SearchInput = styled.input`
  outline: none;
  padding: 0.2rem;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid ${(props) => props.theme.palette.gray};
`;
const SearchBtn = styled.button`
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: white;
  font-size: bold;
  background-color: ${(props) => props.theme.palette.orange};
`;
function SearchBar({ setSearch }: any) {
  const formRef = useRef<HTMLFormElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const onhandleSearch = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSearch(searchRef.current?.value);
    formRef.current?.reset();
  };
  return (
    <SearchContainer ref={formRef}>
      <SearchInput ref={searchRef} />
      <SearchBtn onClick={onhandleSearch}>search</SearchBtn>
    </SearchContainer>
  );
}

export default SearchBar;
