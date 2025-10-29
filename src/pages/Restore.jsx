import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // React Router 사용
import "./Restore.css";

export default function Restore() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userToken") !== null
  );
  const [restoredImage, setRestoredImage] = useState(null); // 복원된 이미지를 저장할 상태 추가

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login"); // 로그인하지 않은 상태라면 로그인 페이지로 리디렉션
    }
  }, [isLoggedIn, navigate]);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadToServer(file); // 업로드 후 서버로 전송
    }
  };

  // 서버에 이미지 전송
  const uploadToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://192.168.0.51:5000/api/image/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("복원된 이미지:", data.restored_image);
      setRestoredImage(data.restored_image); // 복원된 이미지를 상태에 저장
    } else {
      console.error("이미지 업로드 실패");
    }
  };

  // 로그인/로그아웃 버튼 클릭 시
  const handleLogin = () => {
    localStorage.setItem("userToken", "true");
    setIsLoggedIn(true); // 로그인 상태 업데이트
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false); // 로그아웃 상태 업데이트
    navigate("/"); // 홈으로 리디렉션
  };

  // 로고 클릭 시 첫 화면으로 이동
  const handleLogoClick = () => {
    navigate("/"); // 홈으로 이동
  };

  // 돌아가기 아이콘 클릭 시 홈 화면으로 이동
  const handleBackToHome = () => {
    navigate("/"); // 홈으로 이동
  };

  return (
    <motion.div
      className="restore-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <header>
        {/* 타이틀 */}
        <motion.div className="logo" onClick={handleLogoClick}>
          Re:Memory
        </motion.div>

        {/* 로그인/로그아웃 버튼 */}
        <motion.button
          className="menu-btn"
          onClick={isLoggedIn ? handleLogout : handleLogin}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </motion.button>
      </header>

      {/* 본문 */}
      <main className="center-content">
        <motion.h1 className="main-title">Re:Memory AI Restoration</motion.h1>
        <motion.p className="subtitle">
          AI로 잃어버린 추억을 되살리세요.
        </motion.p>

        {/* 이미지 업로드 박스 */}
        <motion.div
          className="upload-box"
          onClick={() => document.getElementById("upload").click()}
        >
          <input
            id="upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <p>이미지를 업로드하려면 클릭하세요</p>
        </motion.div>

        {/* 복원된 이미지 표시 */}
        {restoredImage && (
          <div className="restored-image-container">
            <h2>복원된 이미지</h2>
            <img src={restoredImage} alt="Restored" />
          </div>
        )}
      </main>
    </motion.div>
  );
}
