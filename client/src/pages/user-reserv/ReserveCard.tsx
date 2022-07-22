import React, { useState } from "react";
import { InfoCard, TextContainer } from "../../components/Liststyle";
import { Column } from "./ReserveStyle";
import ReservationModalForm from "../../components/book/ReservationModalForm";
function ReserveCard({ res }: any) {
  console.log(res);

  return (
    <InfoCard>
      <TextContainer>
        <Column>인덱스</Column>
        <Column>날짜+시간</Column>
        <Column></Column>
        <Column>상태</Column>
        <Column>
          <ReservationModalForm />
        </Column>
      </TextContainer>
    </InfoCard>
  );
}

export default ReserveCard;
