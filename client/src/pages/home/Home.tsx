import React from 'react';
import styled from 'styled-components';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MainCard from '../../components/main/MainCard';
import TagList from './TagList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`


export default function home() {
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <Header />
          <TagList />
          <MainCard />
        </ContentWrapper>
        <Footer />
      </Wrapper>
    </>
  )
}
