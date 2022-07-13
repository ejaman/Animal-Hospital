import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub} from '@fortawesome/free-brands-svg-icons';

const Container = styled.div`
  width: 100%;
  height: 200px;
  background-color: black;
  color: white;
  padding: 30px 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Team = styled.h2`
  font-size: 28px;
  color: white;
  text-align: center;
`;

const Member = styled.p`
  margin-bottom: 30px;
  font-size: 16px;
  text-align: center;
`;

const LinkBtn = styled.a`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const InfoContainer = styled.div`

`;

const Role = styled.h2`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const Year = styled.p`
  text-align: center;
  margin-top: 8px;
`;

const EtcContainer = styled.div`
  
`

const Contact = styled(Role)`
  margin-bottom: 30px;
`

export default function Footer() {
  return (
    <Container>
      <div>
        <Team>Team 14</Team>
        <Year>@2022 Copyright by Team14</Year>
        <LinkBtn href='https://github.com/Elice-SW-2-Team14/Animal-Hospital.git'>
          <FontAwesomeIcon icon={faGithub} size='3x' color='white' />
        </LinkBtn>
      </div>
      <InfoContainer>
        <Role>BACK</Role>
        <Member>권재구 권필주</Member>
        <Role>FRONT</Role>
        <Member>김다운 김호진 박민수 이지민</Member>
      </InfoContainer>
      <EtcContainer>
        <Contact>CONTACT</Contact>
        <Member>주소: 서울 성수 낙낙 2층</Member>
        <Member>전화번호: 02-1234-1234</Member>
      </EtcContainer>
    </Container>
  )
}
