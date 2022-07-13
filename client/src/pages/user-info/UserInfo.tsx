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
  address: string;
  email: string;
  password: string;
  phoneNumber: string;
};

function UserInfo() {
  // 받아온 정보를 저장하는 state
  const [userInfo, setUserInfo] = useState<UserInfoType>();

  // 처음 한 번만 정보를 받아오도록
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5100/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUserInfo(res.data));
  }, []);
  console.log("user information: ", userInfo);
  // destructuring?

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);

    // const data = {
    //   // ...UserInfo.defaultProps,
    //   [event.currentTarget.name]: event.currentTarget.value,
    // };
    // console.log(data);
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
            name="name"
            onChange={onChange}
            value={userInfo?.userName}
          />
        </Container>
        <Container>
          <InputLabel>이메일 주소</InputLabel>
          <InfoInput value={userInfo?.email} disabled />
        </Container>
        <Container>
          <InputLabel>비밀번호</InputLabel>
          <InfoInput name="password" onChange={onChange} value="***" disabled />
          <InfoInput
            name="password"
            onChange={onChange}
            value="비밀번호 확인"
          />
          <InfoBtn>확인</InfoBtn>
        </Container>
        <Container>
          <InputLabel>전회번호</InputLabel>
          <InfoInput
            name="phoneNumber"
            onChange={onChange}
            value={userInfo?.phoneNumber}
          />
        </Container>

        <Container>
          <InputLabel>주소 이거 확인 ㄲ</InputLabel>
          <InfoInput
            name="postalNumber"
            onChange={onChange}
            value={userInfo?.address}
          />
          <InfoBtn>주소찾기</InfoBtn>
          <Divider>
            {/* <InfoInput name="address1" onChange={onChange} value={address1} />
            <InfoInput name="address2" onChange={onChange} value={address2} /> */}
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
