import React, {useState} from 'react';

import MainCard, { IData } from '../../components/main/MainCard';
import Pagination from './Pagenation';
import TagList from './TagList';

export default function Home() {  
  const [page, setPage] = useState<number>(1);
  const limit = 4;
  const offset = (page-1) * limit;
  const [total, setTotal] = useState<number>(0);
  const [filtered, setFiltered] = useState<IData[]>([]);

  return (
    <>
      <TagList
        setFiltered={(data: IData[]) => setFiltered(data)}
        setTotal={(total: number) => setTotal(total)}
        limit={limit}
        page={page}
        setPage={(page: number) => setPage(page)} />
      <MainCard
        offset={offset}
        limit={limit}
        filtered={filtered} />
      <Pagination
        total={total}
        limit={limit}
        page={page}
        setPage={(page: number) => setPage(page)} />
    </>
  )
}
