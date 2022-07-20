import React from "react";
import styled from 'styled-components';
import { InfoCard, TextContainer, InfoText } from "../../components/Liststyle";

export const Column = styled(InfoText)`
  flex: 0 0 20%;
`;
export const CheckBtn = styled.button`
  border: none;
  border-radius: 10px;
  padding: 0.5rem;
  color: white;
  background-color: ${(props) => props.theme.palette.orange};
  font-weight: bold;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export default function ReserveCard() {
  return (
    <>
      <InfoCard>
        <TextContainer>
          <Column>인덱스</Column>
          <Column>날짜+시간</Column>
          <Column>병원이름</Column>
          <Column>상태</Column>
          <Column>
            <CheckBtn>조회﹒수정</CheckBtn>
          </Column>
        </TextContainer>
      </InfoCard>
    </>
  )
}
