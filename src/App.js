// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./css/App.css";
import "./css/index.css";

// ✅ 페이지 import
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";   // 회원가입 추가
import Main from "./pages/Main";       // 메인 (Colorize + Restore 포함)
import { AuthProvider } from "./lib/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ 1. 처음 접속 → 홈 화면 */}
          <Route path="/" element={<Home />} />

          {/* ✅ 2. 로그인 페이지 */}
          <Route path="/login" element={<Login />} />

          {/* ✅ 3. 회원가입 페이지 */}
          <Route path="/signup" element={<Signup />} />

          {/* ✅ 4. 메인 페이지 (Colorize / Restore 탭 내장형 구조) */}
          <Route path="/main" element={<Main />} />

          {/* ✅ 5. 존재하지 않는 경로 → 홈으로 리디렉션 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
