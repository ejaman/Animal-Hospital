import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import {
  InfoText,
  TextContainer,
  ListContainer,
  Header,
} from "../../components/Liststyle";
import { UserInfoType } from "../user-info/Interface";
import SearchBar from "./SearchBar";

const token = localStorage.getItem("token");
function AdminUserList() {
  const [datas, setDatas] = useState<UserInfoType[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:5100/api/userlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDatas(res.data);
      });
  }, []);

  return (
    <ListContainer>
      <SearchBar datas={datas} />
      <Header>
        <InfoText>역할</InfoText>
        <InfoText>이름</InfoText>
        <InfoText>아이디</InfoText>
        <InfoText>상태</InfoText>
      </Header>
    </ListContainer>
  );
}

export default AdminUserList;
