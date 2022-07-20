import React from "react";
import {
  InfoCard,
  TextContainer,
  Title,
  StatusContainer,
  Select,
} from "../../components/Liststyle";
import { CheckBtn, Column } from "./ReserveStyle";

function ReserveCard() {
  return (
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
  );
}

export default ReserveCard;
