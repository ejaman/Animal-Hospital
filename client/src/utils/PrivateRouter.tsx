import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type TPrivateRouteProps = {
  authentication: boolean;
};

// 호진 TODO: any 타입 고치기
const PrivateRouter = ({ authentication }: TPrivateRouteProps): any => {
  const isAuthenticated = localStorage.getItem('token');

  // 인증이 필요한 페이지인데 token이 없으면 => Login 페이지로 이동 , token이 있으면 해당 페이지로 이동
  if (authentication) {
    return isAuthenticated === null || isAuthenticated === undefined ? (
      <Navigate to="/login" />
    ) : (
      <Outlet />
    );
  }
};

export default PrivateRouter;
