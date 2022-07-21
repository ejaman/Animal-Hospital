import React, { useEffect } from "react";
import axios from "axios";
import { Title } from "../../components/InfoForm";
import { Header } from "../../components/Liststyle";
import ReserveCard from "./ReserveCard";
import { Container, Column } from "./ReserveStyle";

const token = localStorage.getItem("token");
function UserReserve() {
  // const [reservInfo, setReservInfo] = useState();
  useEffect(() => {
    try {
      console.log(token);

      // token &&
      axios
        .get("http://localhost:5100/reservation/user/list?page=2&perPage=3", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }, []);

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
      <ReserveCard />
    </Container>
  );
}

export default UserReserve;
