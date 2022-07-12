import React, {useState, useEffect} from "react";
import styled from "styled-components";
import 'antd/dist/antd.css';
import { Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Postcode from './Postcode';
import reg from "../../components/RegExp";

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
`;

const RegisterBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.palette.peach};
  font-size: 12px;
  margin-top: 4px;
`;


interface Props {
  isHospital: boolean,
};

interface IData {
  username: string,
  email: string,
  password: string,
  phone: string,
  hospitalname?: string,
  businessNumber?: string,
  licenseNumber?: string,
  address: IAddr,
  role: string,
  status: string,
}

export interface IAddr {
  postalCode: string,
  address1: string,
  address2: string,
}

const RegisterForm: React.FC<Props> = ({isHospital}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [checkPwd, setCheckPwd] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [hospitalname, setHospitalname] = useState<string>('');
  const [businessNumber, setBusinessNumber] = useState<string>('');
  const [licenseNumber, setLicenseNumber] = useState<string>('');

  const [address, setAddress] = useState<IAddr>({postalCode: '', address1: '', address2: ''});

  const [isSamePwd, setIsSamePwd] = useState<boolean>(true);
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [isPwd, setIsPwd] = useState<boolean>(true);
  const [isPhone, setIsPhone] = useState<boolean>(true);

  const navigate = useNavigate();

  async function handleSubmit(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if(!isEmail) return alert('이메일을 확인해주세요.');
    if(!isPwd) return alert('비밀번호 형식을 확인해주세요.');
    if(!isSamePwd) return alert('비밀번호를 다르게 입력했습니다.');
    if(!isPhone) return alert('휴대폰 번호를 확인해주세요.');

    const data: IData = isHospital ?
      {
        username,
        email,
        password,
        phone,
        role: 'hospital',
        status: 'pending',
        hospitalname,
        businessNumber,
        licenseNumber,
        address
      } :
      {
        username,
        email,
        password,
        phone,
        role: 'user',
        status: 'complete',
        address,
      }

      console.log(data);

    try {
      await axios.post('localhost:5100/api/register', data);
      navigate('/') // 펫 등록 페이지로 이동
    }
    catch(e) {
      console.log(e)
    }

  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    const emailRegex:RegExp = reg.email;
    setIsEmail(emailRegex.test(email) ? true : false);
  }

  function handleChangePwd(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    checkPwd.length && setIsSamePwd(password === checkPwd ? true : false);
  }

  useEffect(() => {
    const passwordRegex:RegExp = reg.password;
    password.length && setIsPwd(passwordRegex.test(password) ? true : false);
  }, [password])

  useEffect(() => {
    setIsSamePwd(password === checkPwd ? true : false);
  }, [checkPwd, password])

  useEffect(() => {
    const phoneRegex: RegExp = reg.phone;
    phone.length && setIsPhone(phoneRegex.test(phone) ? true : false);
  }, [phone])

  return (
    <>
      <form>
        {isHospital && 
          <Input
          placeholder="병원 이름을 입력해주세요"
          value = {hospitalname}
          onChange = {(e) => setHospitalname(e.target.value)}
          style={{ marginTop: "1rem" }}
          required
        />
        }
        <Input
          placeholder="이름을 입력해주세요"
          value = {username}
          onChange = {(e) => setUsername(e.target.value)}
          style={{ marginTop: "1rem" }}
          required
        />
        <Input
          placeholder="이메일을 입력해주세요"
          value = {email}
          onChange = {handleChangeEmail}
          style={{ marginTop: "1rem" }}
          required
        />
        {!isEmail && <ErrorMessage>이메일 형식이 올바르지 않습니다.</ErrorMessage>}
        <Input
          placeholder="비밀번호를 입력해주세요"
          type='password'
          value = {password}
          onChange = {handleChangePwd}
          style={{ marginTop: "1rem" }}
          required
        />
        {!isPwd && <ErrorMessage>비밀번호는 영문, 숫자, 특수문자 조합으로 8자 이상 입력해주세요.</ErrorMessage>}
        <Input
          placeholder="비밀번호를 다시 입력해주세요"
          type= 'password'
          value = {checkPwd}
          onChange = {e => setCheckPwd(e.target.value)}
          style={{ marginTop: "1rem" }}
          required
        />
        {!isSamePwd && <ErrorMessage>비밀번호와 일치하지 않습니다.</ErrorMessage>}
        <Input
          placeholder="전화번호를 입력해주세요 (- 포함)" 
          value = {phone}
          onChange = {(e) => setPhone(e.target.value)}
          style={{ marginTop: "1rem" }}
          required
        />
        {!isPhone && <ErrorMessage>전화번호를 바르게 입력해주세요.</ErrorMessage>}

        <Postcode setAddress={(address: IAddr) => {setAddress(address)}} />

        {isHospital &&
          <div>
            <Input
            placeholder="사업자 등록번호를 입력해주세요"
            value = {businessNumber}
            onChange = {(e) => setBusinessNumber(e.target.value)}
            style={{ marginTop: "1rem" }}
            required
            />
            <Input
            placeholder="면허 번호를 입력해주세요"
            value = {licenseNumber}
            onChange = {(e) => setLicenseNumber(e.target.value)}
            style={{ marginTop: "1rem" }}
            required
            />
          </div>
        }
        <RegisterBtnContainer>
          <RegisterBtn type="submit" onClick={handleSubmit}>회원가입</RegisterBtn>
        </RegisterBtnContainer>
      </form>
    </>
  )
}

export default RegisterForm;