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
  const [search, setSearch] = useState<string>();
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

  const SearchLists = search
    ? datas.filter((data: any) =>
        data.email.includes(`${search}`.toLocaleLowerCase())
      )
    : datas;

  return (
    <ListContainer>
      <SearchBar
        datas={datas}
        setSearch={(search: string) => setSearch(search)}
      />
      <Header>
        <InfoText>역할</InfoText>
        <InfoText>이름</InfoText>
        <InfoText>아이디</InfoText>
        <InfoText>상태</InfoText>
      </Header>
      {SearchLists.map((data: any, i: number) => (
        <UserCard key={i} data={data} />
      ))}
    </ListContainer>
  );
}

export default AdminUserList;
