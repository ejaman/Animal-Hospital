import React from 'react';

import styled from 'styled-components';
import { IData } from '../../components/main/MainCard';

import Tags from './Tags';

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 90px;
`;

export interface ITagsProps {
  setFiltered: (data: IData[]) => void;
  setTotal: (total: number) => void;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

export default function TagList({
  setFiltered,
  setTotal,
  limit,
  page,
  setPage,
}: ITagsProps) {
  return (
    <>
      <TagContainer>
        <Tags
          setFiltered={(data: IData[]) => setFiltered(data)}
          setTotal={(total: number) => setTotal(total)}
          limit={limit}
          page={page}
          setPage={(page: number) => setPage(page)}
        />
      </TagContainer>
    </>
  );
}
