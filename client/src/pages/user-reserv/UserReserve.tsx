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
          .get(
            "http://localhost:5100/reservation/user/list?page=1&perPage=20",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            const data = res.data.data.ReservationsInfo;
            const check = Object.values(data);
            setResInfo(check);
          });
    } catch (err) {
      alert(err);
    }
  }, []);

  const InfoArr = [];
  // useCallback 사용해보기
  if (resInfo.length > 0) {
    for (let i = 0; i < resInfo[0].length + 1; i++) {
      InfoArr.push({
        ...resInfo[0][i],
        ["reservationId"]: resInfo[0][i]?._id,
        ...resInfo[1][i],
        ...resInfo[2][i],
        ...resInfo[3][i],
        ["hpName"]: resInfo[1][i]?.name,
        ["petName"]: resInfo[2][i]?.name,
        ["resName"]: resInfo[3][i]?.name,
      });
    }
  }
  console.log(resInfo);

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

      {InfoArr.map((res: any, i: number) => (
        <ReserveCard key={i} res={res} idx={i} />
      ))}
    </Container>
  );
}

export default UserReserve;
