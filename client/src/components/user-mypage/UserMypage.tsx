import React from "react";
import "antd/dist/antd.min.css";
import styled from "styled-components";
import { PageHeader } from "antd";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  flex-wrap: wrap;
`;
export const Card = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
  width: 31%;
  padding: 1rem;
  margin: 0.3rem;
  :hover {
    transform: scale(1.01);
  }
`;

export const CardTitle = styled.div`
  margin-top: 2rem;
  margin-bottom: 0.3rem;
  font-weight: 500;
`;
export const CardDescription = styled.p`
  font-size: 13px;
  color: gray;
`;

function UserMypage() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <PageHeader
        onBack={() => null}
        title="name님"
        subTitle="마이페이지에 오신걸 환영합니다"
      />
      <Container>
        <Card>
          <i className="fa-solid fa-id-card fa-xl"></i>
          <CardTitle>개인정보</CardTitle>
          <CardDescription>개인정보를 열람하고 수정합니다.</CardDescription>
        </Card>
        <Card>
          <i className="fa-solid fa-paw fa-xl"></i>
          <CardTitle>펫 정보</CardTitle>
          <CardDescription>펫 정보를 열람하고 수정합니다.</CardDescription>
        </Card>
        <Card>
          <i className="fa-solid fa-list-check fa-xl"></i>
          <CardTitle>예약 내역</CardTitle>
          <CardDescription>예약 내역을 확인하고 관리합니다.</CardDescription>
        </Card>
      </Container>
    </div>
  );
}

export default UserMypage;
