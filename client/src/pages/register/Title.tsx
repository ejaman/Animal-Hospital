import React from "react";
import styled from "styled-components";

const Line = styled.div`
  margin: 10px 0 20px;
  border-bottom: solid 1px black;
`

export default function Title({title}: any) {
  return (
    <>
      <h1>{title}</h1>
      <Line />
    </>
  )
}