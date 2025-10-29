import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // navigate 추가
import "./Home.css";
import LoginModal from "./LoginModal";

export default function Home() {
  const navigate = useNavigate(); // navigate hook 사용
  const [currentImage, setCurrentImage] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 초기값을 false로 설정

  const images = [
    `${process.env.PUBLIC_URL}/memory1.jpg`,
    `${process.env.PUBLIC_URL}/memory2.jpg`,
    `${process.env.PUBLIC_URL}/memory3.jpg`,
  ];

  // 페이지가 로드될 때 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true); // userToken이 있으면 로그인된 상태
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Begin Restoration 클릭
  const handleStartClick = () => {
    if (isLoggedIn) {
      navigate("/main/restore"); // navigate로 페이지 이동
    } else {
      setShowModal(true); // 모달 열기
    }
  };

  // Login 버튼 → 로그인 페이지
  const handleLoginClick = () => {
    setFadeOut(true);

    // 모달을 닫고 페이지 이동을 지연
    setShowModal(false); // 로그인 버튼 클릭 시 모달을 닫고
    setTimeout(() => {
      window.location.href = "/login"; // 로그인 페이지로 이동
    }, 300); // 모달을 닫은 후 이동 (300ms 후)
  };

  // Logout
  const handleLogoutClick = () => {
    localStorage.removeItem("userToken"); // 로컬 스토리지에서 userToken 삭제
    setIsLoggedIn(false); // 로그인 상태 false로 변경
    setFadeOut(true);
    setTimeout(() => {
      window.location.href = "/"; // 홈 페이지로 이동
    }, 300);
  };

  // 모달 닫기
  const closeModal = () => setShowModal(false);

  return (
    <motion.div
      className={`home-container ${fadeOut ? "fade-out" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 배경 이미지 */}
      <div
        className="background-slideshow"
        style={{ backgroundImage: `url(${images[currentImage]})` }}
      ></div>
      <div className="overlay"></div>

      {/* Header */}
      <header className="top-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            margin: "0px 20px",
          }}
        >
          <motion.div className="logo">Re:Memory</motion.div>
          <div className="menu-btn-container">
            {/* 로그인 상태에 따라 버튼 텍스트 변경 */}
            <motion.button
              className="menu-btn"
              onClick={isLoggedIn ? handleLogoutClick : handleLoginClick}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="center-content">
        <motion.h1 className="main-title">
          Re:Memory — restoring what time has faded.
        </motion.h1>

        <motion.p className="subtitle">
          Because your memories deserve clarity.
        </motion.p>

        <motion.button className="start-btn" onClick={handleStartClick}>
          Begin Restoration →
        </motion.button>
      </main>

      {/* showModal 전달 */}
      <LoginModal showModal={showModal} onClose={closeModal} />
    </motion.div>
  );
}
