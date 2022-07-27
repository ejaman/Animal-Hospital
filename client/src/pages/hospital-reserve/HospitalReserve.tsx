import React from 'react';
import styled from 'styled-components';
import { Title } from '../../components/InfoForm';
import { InfoText, ListContainer, Header } from '../../components/Liststyle';
import ReserveCard from './ReserveCard';

const Container = styled(ListContainer)`
  max-width: 1000px;
  margin: 0rem auto;
  padding: 1rem;
`;

const Column = styled(InfoText)`
  flex: 0 0 20%;
`;

export default function HospitalReserve() {
  return (
    <>
      <Container>
        <Title>고객 예약 확인하기</Title>
        <Header>
          <Column>이름</Column>
          <Column>이메일</Column>
          <Column>날짜/시간</Column>
          <Column>조회/수정</Column>
        </Header>
        <ReserveCard />
      </Container>
    </>
  );
}
