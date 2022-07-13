import React, { useState } from "react";
import AddressForm, { Data } from "../../components/AddressForm";
import {
  MainContainer,
  Title,
  Form,
  Container,
  InputLabel,
  InfoInput,
  InfoBtn,
  DeactivateContainer,
  DeactiveBtn,
} from "../../components/InfoForm";

function UserInfo() {
  const onhandleUpadate = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // console.log("click", event);
  };
  const onhandleAddressComplete = (data: Data) => {
    // 회원가입 참조
    console.log(data);
  };

  return (
    <MainContainer>
      <Title>개인정보</Title>
      <Form>
        <Container>
          <InputLabel>실명</InputLabel>
          <InfoInput value="name" />
        </Container>
        <Container>
          <InputLabel>이메일 주소</InputLabel>
          <InfoInput value="email@email.com" disabled />
        </Container>
        <Container>
          <InputLabel>비밀번호</InputLabel>
          <InfoInput value="password" />
          <InfoBtn>확인</InfoBtn>
        </Container>
        <Container>
          <InputLabel>전회번호</InputLabel>
          <InfoInput value="010-1234-5678" />
        </Container>
        <AddressForm onComplete={onhandleAddressComplete} />
        <div style={{ display: "flex" }}>
          <InfoBtn style={{ marginLeft: "auto" }} onClick={onhandleUpadate}>
            수정
          </InfoBtn>
        </div>
      </Form>
      <DeactivateContainer>
        <p>Animal Hospital에서 탈퇴하고 싶으신가요?</p>
        <DeactiveBtn onClick={() => alert("탈퇴 ㄲ")}>탈퇴하기</DeactiveBtn>
      </DeactivateContainer>
    </MainContainer>
  );
}

export default UserInfo;
