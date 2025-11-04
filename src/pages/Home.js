import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { useAuth } from "../lib/AuthContext"; // ✅ 로그인 상태 감지용
import "../css/home.css";
import "../css/LoginModal.css";

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ 로그인 상태 및 로그아웃 기능 가져오기

  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ “복원 시작” 버튼 클릭 시
  const handleBeginRestoration = () => {
    if (user) {
      // 로그인 되어 있으면 바로 main으로 이동
      navigate("/main");
    } else {
      // 로그인 안 되어 있으면 모달 표시
      setShowModal(true);
    }
  };

  // ✅ 로그인 페이지로 이동
  const handleLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  // ✅ 모달 닫기
  const handleCloseModal = () => setShowModal(false);

  // ✅ 로그인/로그아웃 버튼
  const handleAuthClick = async () => {
    if (user) {
      await logout();
      alert("로그아웃 되었습니다.");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 배경 이미지 순환 */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`background-slide ${index === currentImage ? "active" : ""}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* 어두운 오버레이 */}
      <div className="dark-overlay" />

      {/* 상단 헤더 */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6">
        <h1 className="text-xl font-semibold text-white">Re:Memory</h1>
        <Button
          variant="outline"
          size="sm"
          className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
          onClick={handleAuthClick}
        >
          {user ? "Logout" : "Login"} {/* ✅ 로그인 상태에 따라 표시 */}
        </Button>
      </header>

      {/* 중앙 콘텐츠 */}
      <div className="hero-content">
        <h2 className="hero-title">
          Re:Memory — restoring what time has faded.
        </h2>
        <p className="hero-subtitle">Because your memories deserve clarity.</p>
        <Button
          variant="outline"
          size="lg"
          className="hero-button"
          onClick={handleBeginRestoration}
        >
          Begin Restoration →
        </Button>
      </div>

      {/* 로그인 모달 */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">로그인이 필요합니다</h2>
            <p className="modal-subtitle">
              서비스를 이용하려면 로그인해주세요.
            </p>

            <div className="modal-buttons">
              <button className="modal-btn login" onClick={handleLogin}>
                로그인
              </button>
              <button className="modal-btn cancel" onClick={handleCloseModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
