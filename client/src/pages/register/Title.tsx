import React from "react";
import styled from "styled-components";

const TitleName = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`

export default function Title({title}: any) {
  return (
    <>
      <TitleName>{title}</TitleName>
    </>
  )
}