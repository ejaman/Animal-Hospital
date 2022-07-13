import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

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
  Divider,
} from "../../components/InfoForm";

type UserInfoType = {
  userName: string;
  address: {
    postalCode: string;
    address1: string;
    address2: string;
  };
  email: string;
  password: string;
  phoneNumber: string;
};
const token = localStorage.getItem("token");

function UserInfo() {
  useEffect(() => {
    axios
      .get("http://localhost:5100/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUserInfo(res.data));
  }, []);

  // 받아온 정보를 저장하는 state
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const address = userInfo?.address;
  console.log(userInfo);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const data = {
      ...userInfo,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    console.log(data);
    // address 부분 조지기
    // setUserInfo(data);
  };

  const onhandleUpadate = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  return (
    <MainContainer>
      <Title>개인정보</Title>
      <Form>
        <Container>
          <InputLabel>실명</InputLabel>
          <InfoInput
            name="userName"
            onChange={onChange}
            value={userInfo?.userName || ""}
          />
        </Container>
        <Container>
          <InputLabel>이메일 주소</InputLabel>
          <InfoInput name="email" value={userInfo?.email || ""} disabled />
        </Container>

        <Container>
          <InputLabel>전회번호</InputLabel>
          <InfoInput
            name="phoneNumber"
            onChange={onChange}
            value={userInfo?.phoneNumber || ""}
          />
        </Container>

        <Container>
          <InputLabel>주소</InputLabel>
          <InfoInput
            name="postalCode"
            onChange={onChange}
            value={address?.postalCode || ""}
          />
          <InfoBtn>주소찾기</InfoBtn>
          <Divider>
            <InfoInput
              name="address1"
              onChange={onChange}
              value={address?.address1 || ""}
            />
            <InfoInput
              name="address2"
              onChange={onChange}
              value={address?.address2 || ""}
            />
          </Divider>
        </Container>
        <Container>
          <InputLabel>비밀번호</InputLabel>
          <InfoInput name="password" placeholder="새 비밀번호" />
          <InfoInput name="password" placeholder="현재 비밀번호" />
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
