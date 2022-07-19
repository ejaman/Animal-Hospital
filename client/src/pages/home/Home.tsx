import React, {useState} from 'react';

import MainCard from '../../components/main/MainCard';
import TagList from './TagList';

export default function Home() {
  const [tagState, setTagState] = useState<string>('');

  return (
    <>
      <TagList setTagState={(tag: string) => setTagState(tag)} />
      <MainCard tagState={tagState} />
    </>
  )
}
