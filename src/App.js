// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./css/App.css";
import "./css/index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Main from "./pages/Main";
import { AuthProvider } from "./lib/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ 처음 접속 → 홈 */}
          <Route path="/" element={<Home />} />

          {/* ✅ 로그인 페이지 */}
          <Route path="/login" element={<Login />} />

          {/* ✅ 기능 페이지들 */}
          <Route path="/main" element={<Main />} />
          {/* <Route path="/main/restore" element={<Restore />} /> */}

          {/* ✅ 잘못된 경로 → 홈으로 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
