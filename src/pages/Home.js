import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 로그인 페이지 이동용
import { Button } from "../components/button";
import "../css/home.css";
import "../css/LoginModal.css"; // ✅ 대문자 주의

const Home = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ 복원 버튼 클릭 → 모달 띄우기
  const handleBeginRestoration = () => {
    setShowModal(true);
  };

  // ✅ 로그인 버튼 클릭 → 로그인 페이지로 이동
  const handleLogin = () => {
    setShowModal(false);
    navigate("/login"); // 🔥 여기서 페이지 이동
  };

  // ✅ 모달 닫기
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 배경 이미지 순환 */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`background-slide ${
            index === currentImage ? "active" : ""
          }`}
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
          onClick={() => console.log("Logout clicked")}
        >
          Logout
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
