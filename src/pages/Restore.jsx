import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { colorizeImage } from "../lib/api"; // ✅ 추가
import "./Restore.css";

export default function Restore() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [restoredImage, setRestoredImage] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // ✅ 이미지 업로드 → 백엔드로 요청
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      // const res = await colorizeImage(file); // API 호출
      // console.log("복원된 이미지:", res.data);
      // setRestoredImage(res.data.restored_image);
    } catch (err) {
      console.error("이미지 업로드 실패", err);
      alert("이미지 업로드 실패 ❌");
    }
  };

  //   try {
  //     const res = await colorizeImage(file); // API 호출
  //     console.log("복원된 이미지:", res.data);

  //     setRestoredImage(res.data.restored_image);
  //   } catch (err) {
  //     console.error("이미지 업로드 실패", err);
  //     alert("이미지 업로드 실패 ❌");
  //   }
  // };

  // ✅ 로그인 & 로그아웃
  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <motion.div
      className="restore-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* 헤더 */}
      <header className="top-header">
        <motion.div className="logo" onClick={() => navigate("/")}>
          Re:Memory
        </motion.div>

        <motion.button
          className="menu-btn"
          onClick={isLoggedIn ? handleLogout : handleLogin}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </motion.button>
      </header>

      {/* 본문 */}
      <main
        className="center-content"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <motion.h1 className="main-title">Re:Memory AI Restoration</motion.h1>
        <motion.p className="subtitle">
          AI로 잃어버린 추억을 되살리세요.
        </motion.p>

        {/* 업로드 박스 */}
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
