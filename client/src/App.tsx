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
import PetInformation from "./pages/pet-information/PetInformation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-mypage" element={<UserMypage />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/petinfo" element={<PetInformation />} />
        <Route path="/pet-info" element={<PetInfo />} />
        <Route path="/hospital-mypage" element={<HospitalMypage />} />
        <Route path="/hospital-info" element={<HospitalInfo />} />
        <Route path="/admin-mypage" element={<AdminMypage />} />
        <Route path="/admin-userlist" element={<AdminUserList />} />
        <Route path="/admin-hplist" element={<AdminHospitalList />} />a
      </Routes>
    </BrowserRouter>
  );
}

export default App;
