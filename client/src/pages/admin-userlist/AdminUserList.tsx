import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { InfoText, ListContainer, Header } from "../../components/Liststyle";
import { UserInfoType } from "../user-info/Interface";
import styled from "styled-components";
import Checkbox from "../../components/Buttons/CheckBox";
import SearchBar from "./SearchBar";

const Container = styled(ListContainer)`
  max-width: 700px;
  margin: 0rem auto;
  padding: 1rem;
`;
const FlexContainer = styled.div`
  display: flex;
`;

const AdminUserList: React.FC = () => {
  const token = localStorage.getItem("token");
  const [datas, setDatas] = useState<UserInfoType[]>([]);
  const [search, setSearch] = useState<string>();
  const [normal, setNormal] = useState<boolean>(true);
  const [expired, setExpired] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://kdt-sw2-seoul-team14.elicecoding.com:5000/api/userlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDatas(res.data);
      });
  }, []);

  const onhandleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.name === "normal" ? setNormal(!normal) : setExpired(!expired);
  };

  let list = datas.filter((data) =>
    normal && !expired
      ? data.userStatus === "normal"
      : !normal && expired
      ? data.userStatus === "expired"
      : !normal && !expired
      ? data.userStatus === ""
      : data.userName.includes("")
  );
  console.log(search);
  if (search) {
    list = list.filter((data: any) => data.email.includes(search));
  }

  return (
    <Container>
      <FlexContainer>
        <Checkbox
          onChange={onhandleCheck}
          text="normal"
          title="일반회원"
          checked={normal}
        />
        <Checkbox
          onChange={onhandleCheck}
          text="expired"
          title="탈퇴회원"
          checked={expired}
        />
        <SearchBar setSearch={(search: string) => setSearch(search)} />
      </FlexContainer>

      <Header>
        <InfoText>역할</InfoText>
        <InfoText>이름</InfoText>
        <InfoText>아이디</InfoText>
        <InfoText>상태</InfoText>
      </Header>
      {list.map((data: any, i: number) => (
        <UserCard key={i} data={data} />
      ))}
    </Container>
  );
};

export default AdminUserList;
