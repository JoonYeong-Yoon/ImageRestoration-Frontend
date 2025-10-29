import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css";

export default function LoginModal({ showModal, onClose }) {
  const navigate = useNavigate();

  // ✅ showModal=false면 렌더링 X
  if (!showModal) return null;

  const goLogin = () => navigate("/login");

  return (
    <div className="modal-overlay">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">로그인이 필요합니다</h2>

        <p className="modal-text">
          AI 복원 기능을 사용하려면 로그인 후 이용할 수 있습니다.
        </p>

        <div className="modal-actions">
          <button className="modal-btn primary" onClick={goLogin}>
            로그인
          </button>

          {/* ✅ 닫기 버튼 */}
          <button className="modal-btn secondary" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}
