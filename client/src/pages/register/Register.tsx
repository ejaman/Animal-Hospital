import React, {useState} from "react";
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Button } from 'antd';

import Title from './Title';
import NRegisterForm from './NRegisterForm'

const Container = styled.div`
  width: 500px;
  padding: 28px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Welcome = styled.h3`
  margin-bottom: 40px;
`

const BtnContainer = styled.div`
  display: flex;
`

const SelectBtn = styled(Button)`
  &:hover {
    color: ${props => props.theme.palette.blue};
    border-color: ${props => props.theme.palette.blue};
  }
`

const UserSelectBtn = styled(SelectBtn)`

`

const HospitalSelectBtn = styled(SelectBtn)`

`

const RegisterBtn = styled.button`
  width: 120px;
  height: 40px;
  margin: 20px 0;
  text-align: center;
  background-color: ${props => props.theme.palette.blue};
  border: none;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.1s ease-in;
  border-radius: 4px;
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
  }
`

const RegisterBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`

export default function Register() {
  const [isHospital, setIsHospital] = useState<boolean>(false);

  function handleSubmit(e:React.MouseEvent<HTMLElement>) {
    e.preventDefault();
  }
  
  return (
    <Container>
      <Title title='회원가입' />
      <Welcome>동물병원에 오신 것을 환영합니다:)</Welcome>
      <BtnContainer>
        <UserSelectBtn onClick={() => setIsHospital(false)}>
          일반 회원
        </UserSelectBtn>
        <HospitalSelectBtn onClick={() => setIsHospital(true)}>
          병원 회원
        </HospitalSelectBtn>
      </BtnContainer>
      <form>
        <NRegisterForm />
        <RegisterBtnContainer>
          <RegisterBtn type="submit" onClick={handleSubmit}>회원가입</RegisterBtn>
        </RegisterBtnContainer>
      </form>
    </Container>
  )
}