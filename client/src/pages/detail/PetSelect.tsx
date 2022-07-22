import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { CalendarTitle } from "./Calendar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { CustomAxiosGet } from "../../common/CustomAxios";
import { useRecoilState } from "recoil";
import { reservationState } from "../../state/ReservationState";
import { useNavigate } from "react-router-dom";

const PetSelectContainer = styled.div`
  margin-bottom: 20px;
`;
const PetSelectWrapper = styled.div`
  margin-top: 20px;
`;

const PetSelectTitle = styled(CalendarTitle)``;

const PetSelect = () => {
  const navigate = useNavigate();
  // pets의 state를 하나 만들어준다.
  const [pets, setPets] = useState([]);
  const [petName, setPetName] = useState();
  const [petId, setPetId] = useRecoilState(reservationState);
  const token = localStorage.getItem("token");

  // useEffect를 통해서 data를 받아와 pets의 상태를 정해준다. 처음 받아온 상태만 지정해준다.
  useEffect(() => {
    CustomAxiosGet.get("/pet/mypets").then((res) => {
      setPets(res.data);
    });
  }, []);

  const handleChangePetInfo = (event: any) => {
    const { value } = event.target;
    setPetId({
      ...petId,
      pet: value,
    });
  };

  const selectPets = pets.map(
    (pet: { name: string; _id: number }, index: number) => (
      <MenuItem key={index} value={pet._id}>
        {pet.name}
      </MenuItem>
    )
  );
  // 토큰이 있으면 보여주고 없으면 내 펫 선택하기 부분이 보여지지 않는다.
  return (
    <PetSelectWrapper>
      {token && (
        <>
          <PetSelectContainer>
            <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faPaw} />
            <PetSelectTitle>펫 정보 선택</PetSelectTitle>
          </PetSelectContainer>
          <Select
            labelId="demo-select-small"
            id="demo-simple-small"
            label="pet"
            sx={{ width: 150 }}
            defaultValue=""
            onChange={handleChangePetInfo}
          >
            {selectPets}
          </Select>
        </>
      )}
    </PetSelectWrapper>
  );
};

export default PetSelect;
