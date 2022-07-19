import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`

export default function LayoutSearch() {
  return (
    <>
      <Wrapper>
        <Header />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
        <Footer />
      </Wrapper>
    </>
  )
}