import React, {useState} from 'react'
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import 'antd/dist/antd.css';
import { Input, Button } from 'antd';
import Modal from 'react-modal';

const AddressContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 4px;
`;

const SearchAddr = styled(Button)`
  width: 100px;
  text-align: center;
  margin-top: 1rem;
`;


export default function Postcode() {
  const [postal, setPostal] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');

  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleComplete(data: any) {
    console.log(data);
    setPostal(data.zonecode);
    setAddress1(data.roadAddress);
    setIsOpen(false);
  }

  // Modal 스타일
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
      left: "0",
      margin: "auto",
      width: "500px",
      height: "600px",
      padding: "0",
      overflow: "hidden",
    },
  };

  return (
    <AddressContainer>
        <Input
          placeholder="우편번호"
          value={postal}
          style={{ marginTop: "1rem", cursor: 'auto', backgroundColor: 'white', color: 'black' }}
          required
          disabled
        />
        <SearchAddr onClick={() => setIsOpen(true)}>주소 찾기</SearchAddr>
        <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles} onRequestClose={() => setIsOpen(false)}>
          <DaumPostcode onComplete={handleComplete} style={{height: '100%'}} />
        </Modal>
        <Input
          placeholder="주소"
          value={address1}
          style={{ marginTop: "0.5rem", cursor: 'auto', backgroundColor: 'white', color: 'black'}}
          required
          disabled
        />
        <Input
          placeholder="상세주소"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          style={{ marginTop: "0.5rem" }}
          required
        />
      </AddressContainer>
  )
}
