import React from "react";
import { ListContainer } from "../../components/Liststyle";
import HpCard from "./HpCard";

function AdminHospitalList() {
  const onClick = () => {
    console.log("click");
  };
  return (
    <ListContainer>
      <div>검색창 만들기</div>
      <HpCard />
    </ListContainer>
  );
}

export default AdminHospitalList;
