import React, {useState} from "react";
import styled from "styled-components";
import 'antd/dist/antd.css';
import { Input, Button } from 'antd';

const AddressContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 4px;
`;

const SearchAddr = styled(Button)`
  width: 100px;
  text-align: center;
`



export default function NRegisterForm() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPwd, setCheckPwd] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [postal, setPostal] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');

  return (
    <>
      <Input
        placeholder="이름을 입력해주세요"
        value = {username}
        onChange = {(e) => setUsername(e.target.value)}
        style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
      />
      <Input
        placeholder="이메일을 입력해주세요"
        value = {email}
        onChange = {(e) => setEmail(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <Input
        placeholder="비밀번호를 입력해주세요"
        value = {password}
        onChange = {(e) => setPassword(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <Input
        placeholder="비밀번호를 다시 입력해주세요"
        value = {checkPwd}
        onChange = {(e) => setCheckPwd(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <Input
        placeholder="전화번호를 입력해주세요" 
        value = {phone}
        onChange = {(e) => setPhone(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <AddressContainer>
        <Input
          placeholder="우편번호"
          style={{ marginBottom: "0.5rem" }}
        />
        <SearchAddr>주소 찾기</SearchAddr>
        <Input
          placeholder="주소"
          style={{ marginBottom: "0.5rem" }}
        />
        <Input
          placeholder="상세주소"
          style={{ marginBottom: "0.5rem" }}
        />
      </AddressContainer>
    </>
  )
}