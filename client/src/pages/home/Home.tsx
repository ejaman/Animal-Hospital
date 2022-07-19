import React, {useState} from 'react';

import MainCard from '../../components/main/MainCard';
import Pagination from './Pagenation';
import TagList from './TagList';

export default function Home() {
  const [tagState, setTagState] = useState<string>('');
  
  const [page, setPage] = useState<number>(1);
  const limit = 4;
  const offset = (page-1) * limit;
  const [total, setTotal] = useState<number>(0);

  return (
    <>
      <TagList setTagState={(tag: string) => setTagState(tag)} />
      <MainCard tagState={tagState} offset={offset} limit={limit} setTotal={(total: number) => setTotal(total)} />
      <Pagination total={total} limit={limit} page={page} setPage={(page: number) => setPage(page)} />
    </>
  )
}
