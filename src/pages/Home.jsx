// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../api/api";
import "./Home.css";
import LoginModal from "./LoginModal";

export default function Home({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const images = [
    `${process.env.PUBLIC_URL}/memory1.jpg`,
    `${process.env.PUBLIC_URL}/memory2.jpg`,
    `${process.env.PUBLIC_URL}/memory3.jpg`,
  ];

  // ✅ 배경 이미지 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ "Begin Restoration" 버튼 클릭
  const handleStartClick = () => {
    if (isLoggedIn) {
      navigate("/main/restore");
    } else {
      setShowModal(true);
    }
  };

  // ✅ 로그인 버튼 클릭
  const handleLoginClick = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/login");
    }, 300);
  };

  // ✅ 로그아웃 버튼 클릭
  const handleLogoutClick = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      console.log("✅ 로그아웃 성공");

      setFadeOut(true);
      setTimeout(() => {
        navigate("/");
        window.location.reload(); // 상태 초기화
      }, 300);
    } catch (error) {
      console.error("❌ 로그아웃 실패:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  // ✅ 모달 닫기
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

          {/* ✅ 로그인/로그아웃 버튼 동적 변경 */}
          <div className="menu-btn-container">
            <motion.button
              className="menu-btn"
              onClick={isLoggedIn ? handleLogoutClick : handleLoginClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="center-content">
        <motion.h1 className="main-title">
          Re:Memory — restoring what time has faded.
        </motion.h1>

        <motion.p className="subtitle">
          Because your memories deserve clarity.
        </motion.p>

        <motion.button
          className="start-btn"
          onClick={handleStartClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Restoration →
        </motion.button>
      </main>

      {/* 로그인 모달 */}
      <LoginModal showModal={showModal} onClose={closeModal} />
    </motion.div>
  );
}
