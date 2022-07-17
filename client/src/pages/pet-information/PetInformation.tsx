import React, { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "./PetCard";
import { MainContainer, AddBtn } from "./PetInfoStyle";
import AddPet from "./AddPet";
import { PetInfoType } from "./PetInfoInterface";

const token = localStorage.getItem("token");
function PetInformation() {
  const [pets, setPets] = useState<PetInfoType[]>([]);
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
        setPets(res.data);
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
      {pets.map((pet) => (
        <PetCard pet={pet} />
      ))}
    </MainContainer>
  );
}

export default PetInformation;
