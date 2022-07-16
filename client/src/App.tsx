import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/login/LoginLayout";
import Register from "./pages/register/Register";
import UserMypage from "./pages/user-mypage/UserMypage";
import UserInfo from "./pages/user-info/UserInfo";
import PetInfo from "./pages/pet-info/PetInfo";
import HospitalMypage from "./pages/hospital-mypage/HospitalMypage";
import HospitalInfo from "./pages/hospital-info/HospitalInfo";
import AdminMypage from "./pages/admin-mypage/AdminMypage";
import Home from "./pages/home/Home";
import AdminUserList from "./pages/admin-userlist/AdminUserList";
import Detail from "./pages/detail/Detail";
import AdminHospitalList from "./pages/admin-hplist/AdminHospitalList";

import LayoutSearch from "./components/LayoutSearch";
import LayoutMypage from "./components/LayoutMypage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<LayoutSearch />}>
          <Route path="/" element={<Home />} />
          <Route path="detail" element={<Detail />} />
        </Route>
        <Route element={<LayoutMypage />}>
          <Route path="/user-mypage" element={<UserMypage />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/pet-info" element={<PetInfo />} />
          <Route path="/hospital-mypage" element={<HospitalMypage />} />
          <Route path="/hospital-info" element={<HospitalInfo />} />
          <Route path="/admin-mypage" element={<AdminMypage />} />
          <Route path="/admin-userlist" element={<AdminUserList />} />
          <Route path="/admin-hplist" element={<AdminHospitalList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
