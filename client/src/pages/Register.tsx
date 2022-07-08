import React, {useState} from "react";
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Button } from 'antd';

import Title from '../components/common/Title';

const Container = styled.div`
  margin: 10px;
  padding: 28px;
  border: 1px solid black;
  border-radius: 4px;
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
  background-color: ${props => !props.isHospital && props.theme.palette.blue};
  color: ${props => !props.isHospital && 'white'};
`

const HospitalSelectBtn = styled(SelectBtn)`
  background-color: ${props => props.isHospital && props.theme.palette.blue};
  color: ${props => props.isHospital && 'white'};
`

export default function Register() {
  const [isHospital, setIsHospital] = useState<boolean>(false);
  console.log(isHospital);
  return (
    <Container>
      <Title title='회원가입' />
      <Welcome>동물병원에 오신 것을 환영합니다:)</Welcome>
      <BtnContainer>
        <UserSelectBtn isHospital={isHospital} onClick={() => setIsHospital(false)}>
          일반 회원
        </UserSelectBtn>
        <HospitalSelectBtn isHospital={isHospital} onClick={() => setIsHospital(true)}>
          병원 회원
        </HospitalSelectBtn>
      </BtnContainer>
    </Container>
  )
}