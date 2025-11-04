// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./layouts/MainLayout";
import Colorize from "./pages/Colorize";
import Restore from "./pages/Restore";
import { getCurrentUser } from "./api/api";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ 앱 로드 시 인증 상태 확인 (쿠키 기반)
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // 백엔드 /api/auth/me 호출로 세션 유효성 확인
        const response = await getCurrentUser();
        if (response.ok) {
          setIsLoggedIn(true);
          console.log("✅ 로그인 상태 확인됨:", response.data);
        }
      } catch (error) {
        // 401 에러 또는 세션 만료 시
        console.log("❌ 로그인되지 않음");
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // ✅ 로딩 중 화면
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#000",
          color: "#fff",
          fontSize: "1.5rem",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* 홈 페이지 */}
      <Route
        path="/"
        element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      />

      {/* 로그인 페이지 */}
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/main/restore" replace />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />

      {/* 회원가입 페이지 */}
      <Route
        path="/signup"
        element={
          isLoggedIn ? (
            <Navigate to="/main/restore" replace />
          ) : (
            <Signup setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />

      {/* 메인 레이아웃 (로그인 필요) */}
      <Route
        path="/main"
        element={
          isLoggedIn ? (
            <MainLayout setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route index element={<Navigate to="/main/restore" replace />} />
        <Route path="colorize" element={<Colorize />} />
        <Route path="restore" element={<Restore />} />
      </Route>

      {/* 존재하지 않는 경로는 홈으로 리디렉션 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
