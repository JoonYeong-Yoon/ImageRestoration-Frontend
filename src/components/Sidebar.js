// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Image Lab</h2>

      {/* 메뉴 링크들 */}
      <NavLink
        to="/main/colorize"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        🎨 흑백 → 컬러 변환
      </NavLink>

      <NavLink
        to="/main/restore"
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        🔧 사진 복원
      </NavLink>

      {/* 로그아웃 버튼 */}
      {onLogout && (
        <button className="sidebar-logout-btn" onClick={onLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Sidebar;
