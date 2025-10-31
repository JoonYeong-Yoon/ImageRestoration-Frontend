import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./layouts/MainLayout";
import GrayscaleToColor from "./components/GrayscaleToColor";
import Restore from "./pages/Restore";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 로그인 상태 확인: 컴포넌트가 처음 렌더링될 때 localStorage에서 가져오기
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true); // 로그인 상태가 true로 설정
    }
  }, []); // 처음 한 번만 실행

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/signup" element={<Signup />} />

      {/* 로그인 상태에 따라 다른 페이지를 렌더링 */}
      <Route
        path="/main"
        element={isLoggedIn ? <MainLayout /> : <Navigate to="/login" />}
      />
      <Route path="/main/colorize" element={<GrayscaleToColor />} />
      <Route path="/main/restore" element={<Restore />} />

      {/* 존재하지 않는 경로는 홈으로 리디렉션 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
