import React, { useEffect, useState } from "react";
import axios from "axios";
import { Title } from "../../components/InfoForm";
import { Header } from "../../components/Liststyle";
import ReserveCard from "./ReserveCard";
import { Container, Column } from "./ReserveStyle";

const token = localStorage.getItem("token");
function UserReserve() {
  // 정보 뿌려주고 수정하기, pagination
  const [resInfo, setResInfo] = useState<any>({
    Reservations: [],
    hospInfoes: [],
    petInfoes: [],
    rezStatusInfoes: [],
  });
  useEffect(() => {
    try {
      token &&
        axios
          .get("http://localhost:5100/reservation/user/list?page=2&perPage=3", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const data = res.data.data.ReservationsInfo;
            setResInfo({ ...data });
          });
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }, []);
  console.log(resInfo);
  // console.log(resInfo.Reservations);

  return (
    <Container>
      <Title>내 예약 확인하기</Title>
      <Header>
        <Column>no</Column>
        <Column>날짜/시간</Column>
        <Column>병원</Column>
        <Column>예약현황</Column>
        <Column></Column>
      </Header>
      {resInfo.Reservations.map((res: any, i: number) => (
        <ReserveCard key={i} res={res} />
      ))}
      <ReserveCard />
    </Container>
  );
}

export default UserReserve;
