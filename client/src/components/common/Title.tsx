import React from "react";
import styled from "styled-components";

const TitleName = styled.h2`
  
`

export default function Title({title}) {
  return (
    <>
      <TitleName>{title}</TitleName>
    </>
  )
}