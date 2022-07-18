import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import HeaderMypage from './HeaderMypage';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`

export default function LayoutMypage() {
  return (
    <>
      <Wrapper>
        <HeaderMypage />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
        <Footer />
      </Wrapper>
    </>
  )
}