import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ React Router 이동용 훅
import "../css/LoginModal.css";

export default function LoginModal({ showModal, onClose }) {
  const navigate = useNavigate(); // ✅ 페이지 이동 함수 선언

  if (!showModal) return null; // 모달이 안보일 때 렌더 안함

  const handleLoginClick = () => {
    onClose(); // 🔹 모달 닫기
    navigate("/login"); // 🔹 로그인 페이지로 이동 (리로드 없이)
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">로그인이 필요합니다</h2>
        <p className="modal-subtitle">서비스를 이용하려면 로그인해주세요.</p>

        <div className="modal-buttons">
          <button className="modal-btn login" onClick={handleLoginClick}>
            로그인
          </button>
          <button className="modal-btn cancel" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
