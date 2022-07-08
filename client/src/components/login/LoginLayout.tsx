import React from 'react';
import {
  LoginWrapper,
  LoginContainer,
  LoginInput,
  LoginButton,
  LoginTitle,
  RegisterButton,
  KakaoButton,
  HospitalCheck,
  PasswordInput,
} from './LoginStyle';

import { FormControlLabel, Checkbox } from '@mui/material';

const handleRegister = (e: React.MouseEvent<HTMLElement>): void => {
  console.log('login 클릭이 발생했나요?');
};

const handleLogin = (e: React.MouseEvent<HTMLElement>): void => {
  console.log('register 클릭이 발생했나요?');
};

function LoginLayout() {
  return (
    <LoginContainer action="">
      <LoginWrapper>
        <LoginTitle>로그인</LoginTitle>
        <LoginInput
          label="이메일을 입력해주세요"
          variant="outlined"
          required
          autoFocus
          sx={{ mb: 1 }}
        />
        <PasswordInput
          label="비밀번호를 입력해주세요"
          variant="outlined"
          required
          sx={{ mb: 1 }}
        />
        <HospitalCheck>
          <FormControlLabel control={<Checkbox />} label="병원 회원" />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="일반 회원"
          />
        </HospitalCheck>
        <LoginButton
          onClick={handleLogin}
          variant="contained"
          type="submit"
          sx={{ mb: 1, bgcolor: '#F87474' }}
        >
          로그인
        </LoginButton>
        <KakaoButton
          onClick={handleLogin}
          variant="contained"
          type="submit"
          sx={{ mb: 1 }}
        >
          카카오 로그인
        </KakaoButton>
        <RegisterButton
          onClick={handleRegister}
          variant="outlined"
          type="submit"
        >
          회원 가입
        </RegisterButton>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default LoginLayout;
