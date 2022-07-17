import React, { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "./PetCard";
import { MainContainer, AddBtn } from "./PetInfoStyle";
import AddPet from "./AddPet";

const token = localStorage.getItem("token");
function PetInformation() {
  const [pets, setPets] = useState();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  // 처음 한 번만 서버 통신
  useEffect(() => {
    axios
      .get("http://localhost:5100/pet/mypets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);
  return (
    <MainContainer>
      <h1>pet info</h1>
      <AddBtn>
        <i className="fa-solid fa-plus fa-xl"></i>
      </AddBtn>
      {isOpen && <AddPet />}
      <PetCard />
    </MainContainer>
  );
}

export default PetInformation;
