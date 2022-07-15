import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import {
  InfoText,
  TextContainer,
  ListContainer,
  Header,
} from "../../components/Liststyle";

const token = localStorage.getItem("token");
function AdminUserList() {
  const [datas, setDatas] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:5100/api/userlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data[1]);
        setDatas(res.data);
      });
  }, []);

  // const res = await axios.get("http://localhost:5100/api/userlist", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // const data = res.data;

  return (
    <ListContainer>
      <div>검색창 만들기</div>
      <Header>
        <InfoText>역할</InfoText>
        <InfoText>이름</InfoText>
        <InfoText>아이디</InfoText>
        <InfoText>상태</InfoText>
      </Header>

      {datas.map((data) => (
        <UserCard data={data} />
      ))}
      {/* <UserCard /> */}
    </ListContainer>
  );
}

export default AdminUserList;
