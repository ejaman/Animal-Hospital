import React, { useState } from "react";
import axios from "axios";

import UserCard from "./UserCard";
import { ListContainer } from "../../components/Liststyle";

const token = localStorage.getItem("token");
function AdminUserList() {
  // axios
  //   .get("http://localhost:5100/api/userlist", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res);
  //   });
  return (
    <ListContainer>
      <div>검색창 만들기</div>
      <UserCard />
    </ListContainer>
  );
}

export default AdminUserList;
