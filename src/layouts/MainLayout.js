// src/layouts/MainLayout.js
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api";
import Sidebar from "../components/Sidebar";
import "./MainLayout.css";

const MainLayout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // ✅ 로그아웃 처리
  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      navigate("/");
      window.location.reload(); // 상태 완전 초기화
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="main-layout">
      <div className="sidebar-container">
        <Sidebar onLogout={handleLogout} />
      </div>
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
