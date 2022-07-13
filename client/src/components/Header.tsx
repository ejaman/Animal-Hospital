import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${props => props.theme.palette.beige};
`

export default function Header() {
  return (
    <HeaderContainer>

    </HeaderContainer>
  )
}
