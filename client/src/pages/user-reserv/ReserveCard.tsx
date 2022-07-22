import React, { useState } from "react";
import { InfoCard, TextContainer } from "../../components/Liststyle";
import { Column } from "./ReserveStyle";
import ReservationModalForm from "../../components/book/ReservationModalForm";
function ReserveCard({ res, idx }: any) {
  console.log(res);

  return (
    <InfoCard>
      <TextContainer>
        <Column>{idx + 1}</Column>
        <Column>{`${res?.rezDate}, ${res?.rezHour}시`}</Column>
        <Column>{res?.hpName}</Column>
        <Column>{res?.resName}</Column>
        <Column>
          <ReservationModalForm res={res} />
        </Column>
      </TextContainer>
    </InfoCard>
  );
}

export default ReserveCard;
