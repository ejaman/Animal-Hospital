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
        <StatusContainer>
          <Select>
            <option value="회원">예약대기</option>
            <option value="탈퇴회원">예약확정</option>
            <option value="탈퇴회원">예약취소</option>
            <option value="탈퇴회원">진료완료</option>
          </Select>
        </StatusContainer>
        <Column>
          <CheckBtn>조회하기</CheckBtn>
        </Column>
      </TextContainer>
    </InfoCard>
  );
}

export default ReserveCard;
