import React from "react";
import styled from "styled-components";

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

function AdminList() {
  return (
    <ListContainer>
      <div>
        <Button>회원</Button>
        <Button>병원</Button>
      </div>
      <InfoCard>
        <TextContainer>
          <Title>병원명</Title>
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

        <InfoText>병원장</InfoText>
        <InfoText>이메일</InfoText>
        {/* <InfoText>핸드폰 번호</InfoText>
        <InfoText>우편번호</InfoText>
        <TextContainer style={{ display: "flex" }}>
          <InfoText>예약가능 요일</InfoText>
          <InfoText>영업일</InfoText>
          <InfoText>시간당 고객수</InfoText>
        </TextContainer>
        <TextContainer style={{ display: "flex" }}>
          <InfoText>사업자번호</InfoText>
          <InfoText>면허번호</InfoText>
        </TextContainer>
        <InfoText>태그: 태그, 태그</InfoText>
        <InfoText>키워드, 키워드</InfoText> */}
      </InfoCard>
    </ListContainer>
  );
}

export default AdminList;
