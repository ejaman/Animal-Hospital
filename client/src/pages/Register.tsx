import React, {useState} from "react";
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Button } from 'antd';

import Title from '../components/common/Title';
import NRegisterForm from '../components/NRegisterForm'

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

export default function Register() {
  const [isHospital, setIsHospital] = useState<boolean>(false);
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
      <NRegisterForm />
    </Container>
  )
}