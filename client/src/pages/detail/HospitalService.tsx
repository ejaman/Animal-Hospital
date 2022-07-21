import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CustomAxiosGet } from "../../common/CustomAxios";
import { CalendarTitle } from "./Calendar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const HospitalServiceWrapper = styled.div`
  margin-top: 20px;
`;

const HospitalServiceContainer = styled.div`
  margin-bottom: 20px;
`;
const HospitalServiceTitle = styled(CalendarTitle)``;

type THospitalService = {
  name: string;
  price: number;
};

const HospitalService = () => {
  const { hospitalName } = useParams();
  const [hospitalService, setHospitalService] = useState<THospitalService[]>(
    []
  );

  useEffect(() => {
    CustomAxiosGet.get(`/hospital/${hospitalName}/Services`).then((res) =>
      setHospitalService(res.data.data.hospServices)
    );
  }, []);

  console.log(hospitalService);
  const selectServices = hospitalService.map(
    (service: { name: string; price: number }, index: number) => (
      <MenuItem key={index} value={service.name}>
        {service.name} / {service.price}
      </MenuItem>
    )
  );

  return (
    <HospitalServiceWrapper>
      <HospitalServiceContainer>
        <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faBookMedical} />
        <HospitalServiceTitle>서비스</HospitalServiceTitle>
      </HospitalServiceContainer>
      <Select
        labelId="demo-select-small"
        id="demo-simple-small"
        label="pet"
        sx={{ width: 150 }}
        defaultValue=""
      >
        {selectServices}
      </Select>
    </HospitalServiceWrapper>
  );
};

export default HospitalService;
