import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  width: 100%;
  padding-bottom: 10px;
  font-size: 2em;
  font-weight: Bolder;
`;
const Form = styled.form`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
`;
const MainContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto;
`;
const Container = styled.div`
  border-bottom: 1px solid #ebebeb;
  margin: 1rem 0rem;
  padding: 1rem 0rem;
`;
const InputLabel = styled.p`
  font-size: 15px;
`;
const InfoInput = styled.input`
  background: none;
  border: none;
  outline: none;
  color: #a0a0a0;
`;
const InfoBtn = styled.button`
  /* background-color: ${(props) => props.theme.palette.orange}; */
  background-color: black;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.3rem 0.6rem;
  &:hover {
    opacity: 0.8;
  }
`;
const Divider = styled.div`
  margin-top: 1rem;
`;
const DeactivateContainer = styled.div`
  margin: 4rem;
  padding: 1rem;
  text-align: center;
  font-size: 13px;
`;
const DeactiveBtn = styled.button`
  margin-top: 1rem;
  background: none;
  border: none;
  font-weight: 500;
  font-size: 12px;
  border-bottom: 1.1px solid;
  padding: 0.2rem 0.4rem 0 0.4rem;
  &:hover {
    opacity: 0.8;
  }
`;
const onhandleUpadate = (event: React.MouseEvent<HTMLElement>) => {
  event.preventDefault();
  console.log("click", event);
};
function UserInfo() {
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

        <Container>
          <InputLabel>주소</InputLabel>
          <InfoInput value="우편번호" />
          <InfoBtn>주소찾기</InfoBtn>
          <Divider>
            <InfoInput value="주소" />
            <InfoInput value="상세주소" />
          </Divider>
        </Container>

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
