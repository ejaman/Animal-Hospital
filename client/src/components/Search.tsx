import React, {useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  border: 2px solid ${props => props.theme.palette.orange};
  border-radius: 10px;
  padding: 8px 12px;
  width: 300px;
  transition: box-shadow 0.2s ease-in-out;
  &:focus {
    outline: none;
    box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.16);
  }
  &:hover {
    box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.16);
  }
`;

const SearchIcon = styled(FontAwesomeIcon) `
  color: ${props => props.theme.palette.orange};
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 10px;
`;

export default function Search() {
  const [search, setSearch] = useState<string>('');

  return (
    <>
      <SearchContainer>
        <SearchInput
          type='text'
          placeholder='검색'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon icon={faMagnifyingGlass} size='2x' />
      </SearchContainer>
    </>
  )
}
