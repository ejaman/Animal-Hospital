import React from "react";
import styled from "styled-components";
// import HospitalCard from "../hospital-info/HospitalInfo";

const ListContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Button = styled.button`
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.1rem;
  background-color: ${(props) => props.theme.palette.gray};
  color: white;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;
const InfoCard = styled.div`
  border-bottom: 2px ${(props) => props.theme.palette.lightgray} solid;
  padding: 0.5rem;
  margin-top: 0.5rem;
`;
const Title = styled.h3`
  display: inline-block;
`;
const TextContainer = styled.div`
  display: flex;
`;
const InfoText = styled.p`
  padding: 0.1rem 0rem;
`;

type AdminList = {
  hospitalName: string;
  doctorName: string;
  email: string;
  password: string;
  phoneNumber: number;
  tradersNumber: string;
  licenseNumber: string;
  image: string;
  postalNumber: number;
  address1: string;
  address2: string;
  categories: string;
  keywords: Array<string>;
  openingHours: string;
  customersPerHours: number;
};
AdminList.defaultProps = {
  data: {
    hospitalName: "이이진진수수 동동물물병병원원",
    doctorName: "김진수",
    email: "sarangS2hospital@gmail.com",
    password: "",
    phoneNumber: "010-0000-0000",
    tradersNumber: "XXXXXXXXX",
    licenseNumber: "XXXXXXXXX",
    image: "https://o-oa.com/wp-content/uploads/2020/05/LJS_01.jpg",
    postalNumber: 13477,
    address1: "경기 성남시 분당구 판교공원로5길 15",
    address2: "이진수 동물병원",
    categories: "병원",
    keywords: ["키워드", "예시"],
    openingHours: "24시간",
    customersPerHours: 3,
  },
};
function AdminList({
  hospitalName,
  doctorName,
  email,
  password,
  phoneNumber,
  tradersNumber,
  licenseNumber,
  image,
  postalNumber,
  address1,
  address2,
  categories,
  keywords,
  openingHours,
  customersPerHours,
}: AdminList) {
  return (
    <ListContainer>
      <div>
        <Button>회원</Button>
        <Button>병원</Button>
      </div>
      <InfoCard>
        <TextContainer>
          <Title>{hospitalName}</Title>
          <select>
            <option>가입승인</option>
            <option>확인중</option>
            <option>취소</option>
            <option>불허</option>
          </select>
          <select>
            <option>회원</option>
            <option>탈퇴회원</option>
          </select>
        </TextContainer>

        <InfoText>{doctorName}</InfoText>
        <InfoText>{email}</InfoText>
        <InfoText>{phoneNumber}</InfoText>
        <InfoText>
          우편번호({postalNumber}) {address1} {address2}
        </InfoText>
        <TextContainer style={{ display: "flex" }}>
          <InfoText>예약가능 요일</InfoText>
          <InfoText>{openingHours}</InfoText>
          <InfoText>{customersPerHours}</InfoText>
        </TextContainer>
        <TextContainer style={{ display: "flex" }}>
          <InfoText>{tradersNumber}</InfoText>
          <InfoText>{licenseNumber}</InfoText>
        </TextContainer>
        <InfoText>태그: {categories}</InfoText>
        <InfoText>{keywords.map((a) => a + " ")}</InfoText>
      </InfoCard>
    </ListContainer>
  );
}

export default AdminList;
