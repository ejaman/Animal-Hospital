import React, { useEffect, useState } from "react";
import { InfoCard, TextContainer } from "../../components/Liststyle";
import { Column } from "../user-reserv/ReserveStyle";
import { CustomAxiosGet } from "../../common/CustomAxios";
import ReservationModalForm from "../../components/book/ReservationModalForm";

const AdminReserveCard = () => {
  const [reserveData, setReserveData] = useState<any>();

  const getFetchData = (): Promise<any> =>
    new Promise(async (resolve, reject) => {
      const result = await CustomAxiosGet.get(
        "/reservation/admin/list?page=1&perPage=20"
      );
      setReserveData(result.data.data.ReservationsInfo);
    });

  useEffect(() => {
    getFetchData();
  }, []);

  const adminInfoContainer = () => {
    const res = [];

    for (let i = 0; i < 20; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      res.push(
        <TextContainer key={i}>
          <Column>{reserveData?.customerInfoes[i].email}</Column>
          <Column>{reserveData?.customerInfoes[i].userName}</Column>
          <Column>{reserveData?.Reservations[i].hospital}</Column>
          <Column>{reserveData?.Reservations[i].rezDate}</Column>
          <Column>
            <ReservationModalForm />
          </Column>
        </TextContainer>
      );
    }
    return res;
  };

  return (
    <InfoCard>
      <>{adminInfoContainer()}</>
    </InfoCard>
  );
};

export default AdminReserveCard;
