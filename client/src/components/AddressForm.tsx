import React, { useState } from "react";
import DaumPost from "./DaumPost";
import { Container, InfoBtn, InfoInput, InputLabel, Divider } from "./InfoForm";

function AddressForm({}) {
  const [zipCode, setZipcode] = useState<string>("");
  const [roadAddress, setRoadAddress] = useState<string>("");
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  interface Data {
    zonecode: string;
    roadAddress: string;
  }

  const completeHandler = (data: Data) => {
    setZipcode(data.zonecode);
    setRoadAddress(data.roadAddress);
    setIsOpen(false);
  };

  // 검색 클릭
  const onClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  // 상세 주소
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  // 추가
  const clickHandler = () => {
    if (detailAddress === "") {
      alert("상세주소를 입력해주세요.");
    } else {
      console.log(zipCode, roadAddress, detailAddress);
    }
  };

  return (
    <Container>
      <InputLabel>주소</InputLabel>
      <InfoInput value={zipCode} />
      <InfoBtn onClick={onClick}>주소찾기</InfoBtn>
      <DaumPost isOpen={isOpen} completeHandler={completeHandler} />
      <Divider>
        <InfoInput value={roadAddress} placeholder="도로명 주소" />
        <InfoInput value={detailAddress} placeholder="상세주소" />
      </Divider>
    </Container>
  );
}

export default AddressForm;
