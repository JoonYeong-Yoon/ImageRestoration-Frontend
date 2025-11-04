// src/pages/Restore.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { restoreImage } from "../api/api";
import { logoutUser } from "../api/api";
import "./Restore.css";

export default function Restore() {
  const navigate = useNavigate();
  const [originalImage, setOriginalImage] = useState(null);
  const [restoredImage, setRestoredImage] = useState(null);
  const [originalFilename, setOriginalFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  // ✅ 이미지 업로드 & 복원 처리
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 검사 (예: 10MB 제한)
    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다 ❌");
      return;
    }

    // 이미지 타입 검사
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다 ❌");
      return;
    }

    setLoading(true);
    setOriginalFilename(file.name);

    // 원본 이미지 미리보기
    const originalUrl = URL.createObjectURL(file);
    setOriginalImage(originalUrl);

    try {
      // 백엔드로 이미지 복원 요청
      const restoredUrl = await restoreImage(file);
      setRestoredImage(restoredUrl);
      console.log("✅ 이미지 복원 성공");
    } catch (error) {
      console.error("❌ 이미지 복원 실패:", error);

      if (error.detail) {
        alert(`복원 실패: ${error.detail}`);
      } else if (error.msg) {
        alert(`복원 실패: ${error.msg}`);
      } else {
        alert("이미지 복원 중 오류가 발생했습니다 ❌");
      }

      setOriginalImage(null);
      setRestoredImage(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 슬라이더 이동
  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPosition = (x / rect.width) * 100;
    setSliderPosition(Math.min(100, Math.max(0, newPosition)));
  };

  // ✅ 다운로드
  const handleDownload = () => {
    if (!restoredImage || !originalFilename) return;

    const link = document.createElement("a");
    link.href = restoredImage;
    link.download = `복원_${originalFilename}`;
    link.click();
  };

  // ✅ 다시 시도
  const handleRetry = () => {
    setOriginalImage(null);
    setRestoredImage(null);
    setSliderPosition(50);
  };

  // ✅ 로그아웃
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
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

        <motion.button className="menu-btn" onClick={handleLogout}>
          Logout
        </motion.button>
      </header>

      {/* 본문 */}
      <main className="center-content">
        <motion.h1 className="main-title">Re:Memory AI Restoration</motion.h1>
        <motion.p className="subtitle">
          AI로 잃어버린 추억을 되살리세요.
        </motion.p>

        {/* 로딩 중 */}
        {loading && (
          <div className="loading-spinner">
            <p>이미지를 복원하는 중입니다...</p>
          </div>
        )}

        {/* 업로드 박스 (결과가 없을 때만 표시) */}
        {!originalImage && !loading && (
          <motion.div
            className="upload-box"
            onClick={() => document.getElementById("upload").click()}
            whileHover={{ scale: 1.02 }}
          >
            <input
              id="upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <p>이미지를 업로드하려면 클릭하세요</p>
            <p style={{ fontSize: "0.8rem", color: "#999" }}>
              (JPEG, PNG, BMP 지원 | 최대 10MB)
            </p>
          </motion.div>
        )}

        {/* 비교 슬라이더 */}
        {originalImage && restoredImage && (
          <div
            className="comparison-container"
            onMouseMove={handleSliderMove}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.touches[0].clientX - rect.left;
              const newPosition = (x / rect.width) * 100;
              setSliderPosition(Math.min(100, Math.max(0, newPosition)));
            }}
          >
            <div className="image-wrapper">
              <img src={originalImage} alt="Original" />
              <div
                className="restored-wrapper"
                style={{ width: `${sliderPosition}%` }}
              >
                <img src={restoredImage} alt="Restored" />
              </div>
              <div
                className="slider-handle"
                style={{ left: `${sliderPosition}%` }}
              />
            </div>
          </div>
        )}

        {/* 버튼 영역 */}
        {restoredImage && (
          <div className="button-area">
            <motion.button
              className="restore-btn"
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              복원된 이미지 다운로드 ⬇
            </motion.button>

            <motion.button
              className="restore-btn secondary"
              onClick={handleRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ marginLeft: "1rem", background: "#555" }}
            >
              다른 사진 복원하기 ↩
            </motion.button>
          </div>
        )}
      </main>
    </motion.div>
  );
}
