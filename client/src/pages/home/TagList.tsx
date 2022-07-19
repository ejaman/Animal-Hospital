import React   from 'react'
import styled from 'styled-components';

import Tags from './Tags';

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 90px;
`;

interface IProps {
  setTagState: (tag: string) => void;
}

export default function TagList({setTagState}: IProps) {

  return (
    <>
      <TagContainer>
        <Tags setTagState={(tag:string) => setTagState(tag)} />
      </TagContainer>
    </>
  )
}