import React from "react";
// import styled from "styled-components";
import "antd/dist/antd.min.css";
import { Typography, Form, Input } from "antd";
import { Button } from "antd";

const { Title } = Typography;
const onhandleUpadate = (event: React.MouseEvent<HTMLElement>) => {
  event.preventDefault();
  console.log("click", event);
};
function UserInfo() {
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <Title>개인정보</Title>
      <Form>
        <Input
          style={{ marginBottom: "1rem" }}
          type="text"
          name="name"
          value="name"
        />
        <Input
          style={{ marginBottom: "1rem" }}
          type="text"
          name="email"
          value="email"
          disabled
        />
        <div style={{ marginBottom: "1rem" }}>
          <Input
            style={{ width: "50%" }}
            type="text"
            name="password"
            value="password"
          />
          <Button>확인</Button>
        </div>
        <Input
          style={{ marginBottom: "1rem" }}
          type="text"
          name="phone"
          value="phone"
        />
        <div>
          <div style={{ width: "100%", marginBottom: "1rem" }}>
            <Input
              style={{ width: "50%" }}
              type="text"
              name="postal"
              value="postal"
            />
            <Button>주소찾기</Button>
          </div>
          <Input
            style={{ marginBottom: "1rem" }}
            type="text"
            name="address1"
            value="address1"
          />
          <Input
            style={{ marginBottom: "1rem" }}
            type="text"
            name="address2"
            value="address2"
          />
        </div>
        <Button onClick={onhandleUpadate}>수정버튼</Button>
      </Form>
    </div>
  );
}

export default UserInfo;
