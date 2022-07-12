import React, { useState, useCallback, useEffect } from 'react';
import "antd/dist/antd.min.css";
import styled from "styled-components";
import { Button, Form, Typography } from "antd";
import axios from "axios";

const { Title } = Typography;

// 임시 데이터 (삭제 예정)
const jsonData = {
  "name": "이이진진수수 동동물물병병원원",
  "email": "sarangS2hospital@gmail.com",
  "director": "이진수",
  "password": "12345",
  "address": {
    "postalCode": "13477",
    "address1": "경기 성남시 분당구 판교공원로5길 15",
    "address2": "이진수 동물병원"
  },
  "phoneNumber": "010-0000-0000",
  "businessHours": "24시간",
  "businessNumber": "XXXXXXXXX",
  "licenseNumber": "XXXXXXXXX",
  "holiday": [""],
  "hospitalCapacity": 3,
  "tag": [""],
  "keyword": [""],
  "image": "https://o-oa.com/wp-content/uploads/2020/05/LJS_01.jpg",
  "refreshToken": undefined,
  "hospStatus": "정상",
  "hospRegStatus": "승인완료"
}

export default function HospitalCard() {
  // const [datas, setDatas] = useState<[]>([]);
  // 병원 api 생기면 주석 풀고 나머지 작성 예정
  // const API_URL = `http://localhost:5100/api/hospitals`;

  // useEffect(() => {
  //   if (datas.length) console.log(datas);
  // }, [datas]);

  // const getAPI = useCallback(
  //   async (e: any) => {
  //     e.preventDefault();
  //     const result = await axios.get(API_URL);
  //     console.log("result.data: ", result.data);
  //   },
  //   [API_URL]
  // );
  // validation 시 e.target.value를 바로 비교하면 밀리지 않게 바로바로 비교 가능
  const [name, setName] = useState(jsonData.name);
  const [director, setDirector] = useState(jsonData.director);
  const [phoneNumber, setPhoneNumber] = useState(jsonData.phoneNumber);
  const [businessHours, setBusinessHours] = useState(jsonData.businessHours);
  const [businessNumber, setBusinessNumber] = useState(jsonData.businessNumber);
  const [licenseNumber, setLicenseNumber] = useState(jsonData.licenseNumber);
  const [holiday, setHoliday] = useState(jsonData.holiday);
  const [hospitalCapacity, setHospitalCapacity] = useState(jsonData.hospitalCapacity);
  const [tag, setTag] = useState(jsonData.tag);
  const [keyword, setKeyWord] = useState(jsonData.keyword);
  const [image, setImage] = useState(jsonData.image);
  // refreshToken 등 추가 예정
  const [hospStatus, setHospStatus] = useState(jsonData.hospStatus);
  const [hospRegStatus, setHospRegStatus] = useState(jsonData.hospRegStatus);
  const [address, setAddress] = useState();

  const { postalCode, address1, address2 } = jsonData.address;
  const email = jsonData.email;

  const onChangeName = (e: any) => {
    setName(e.target.value);
    // api가 없어서 실제 수정이 반영되지는 않음. 백에서 완성한 이후 추가 예정
    console.log("이름 변경:", e.target.value);
  }
  const onChangeDirector = (e: any) => {
    setDirector(e.target.value);
    console.log("대표자명 변경:", e.target.value);
  }
  const onChangePhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
    console.log("연락처 변경:", e.target.value);
  }
  const onChangeLicenseNumber = (e: any) => {
    setPhoneNumber(e.target.value);
    console.log("면허번호 변경:", e.target.value);
  }

  const onChangeHospitalCapacity = (e: any) => {
    setHospitalCapacity(e.target.value);
    console.log("시간당 예약 가능 고객 수 변경:", e.target.value);
  }
  const onChangeBusinessNumber = (e: any) => {
    setBusinessNumber(e.target.value);
    console.log("사업자 등록번호 변경:", e.target.value);
  }
  // e.state.value

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert(
      '버튼이 클릭되었습니다(확인용)'
    )
  };
  
  const withdrawButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert('병원 회원 탈퇴 버튼이 클릭되었습니다(확인용)')
  }

  return (
    <div>
      <Form style={{ marginLeft: "2rem" }}>
        <Title>병원 정보</Title>
        <div style={{ marginBottom: "1rem" }} />
        <div>
          <SubTitle>병원명</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} type="text"
            defaultValue={name}
            onChange={onChangeName}
          />
        </div>
        <div>
          <SubTitle>이름</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={director}
            onChange={onChangeDirector}
          />
        </div>
        <div>
          <SubTitle>이메일</SubTitle>
          <input style={{
            marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            value={email}
            autoComplete="username"
            disabled
          />
        </div>
        <div>
          <SubTitle>비밀번호</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="password"
            autoComplete="current-password"
            defaultValue=""
            disabled
          />
          <Button
              style={{ marginLeft: "0.5rem" }}
              onClick={buttonHandler}
            >변경</Button>
        </div>
        <div>
          <SubTitle>병원 연락처</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={phoneNumber}
            onChange={onChangePhoneNumber}
          />
        </div>
        <div>
          <SubTitle>사업자 등록번호</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={businessNumber}
            onChange={onChangeBusinessNumber}
          />
        </div>
        <div>
          <SubTitle>면허번호</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={licenseNumber}
            onChange={onChangeLicenseNumber}
          />
        </div>
        <div>
          <SubTitle>병원 사진</SubTitle>
          <div style={{ marginBottom: "0.5rem" }} />
          <div>
            <img src={image} width="280px" alt="" />
            <Button
              style={{ marginLeft: "0.5rem" }}
              onClick={buttonHandler}
            >수정</Button>
          </div>
        </div>
        <div style={{ marginBottom: "0.5rem" }} />
        <div>
          <SubTitle>주소</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={postalCode}
          />
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={address1}
          />
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={address2}
          />
          <Button style={{ marginLeft: "0.5rem" }}>수정</Button>
        </div>
        <div>
          <SubTitle>카테고리</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={tag}
          />
        </div>
        <div>
          <SubTitle>키워드</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={keyword}
          />
        </div>
        <div>
          <SubTitle>영업시간</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={businessHours}
          />
        </div>
        <div>
          <SubTitle>시간당 예약가능 고객 수</SubTitle>
          <input
            style={{ marginBottom: "1rem", marginLeft: "0.5rem" }} 
            type="text"
            defaultValue={hospitalCapacity}
            onChange={onChangeHospitalCapacity}
          />
        </div>
        <Button 
          style={{ marginLeft: "1rem" }}
          onClick={withdrawButtonHandler}
        >탈퇴</Button>
      </Form>
    </div>
  );
}

const SubTitle = styled.span`
  font-size: 16px;
`