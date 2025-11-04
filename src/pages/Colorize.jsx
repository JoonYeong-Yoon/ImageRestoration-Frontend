// src/pages/Colorize.jsx
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { colorizeImage, logoutUser } from "../api/api";
import "./Colorize.css";

export default function Colorize() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [originalImage, setOriginalImage] = useState(null);
  const [colorizedImage, setColorizedImage] = useState(null);
  const [originalFilename, setOriginalFilename] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // 이미지 업로드 처리
  // =========================
  const handleFile = async (file) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다 ❌");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다 ❌");
      return;
    }

    setLoading(true);
    setOriginalFilename(file.name);

    const originalUrl = URL.createObjectURL(file);
    setOriginalImage(originalUrl);

    try {
      const colorizedUrl = await colorizeImage(file);
      setColorizedImage(colorizedUrl);
      console.log("✅ 컬러화 성공");
    } catch (error) {
      console.error("❌ 컬러화 실패:", error);
      alert("이미지 컬러화 중 오류가 발생했습니다 ❌");
      setOriginalImage(null);
      setColorizedImage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  // =========================
  // 다운로드
  // =========================
  const handleDownload = () => {
    if (!colorizedImage || !originalFilename) return;

    const link = document.createElement("a");
    link.href = colorizedImage;
    link.download = `컬러화_${originalFilename}`;
    link.click();
  };

  // =========================
  // 다시 시도
  // =========================
  const handleRetry = () => {
    setOriginalImage(null);
    setColorizedImage(null);
  };

  // =========================
  // 로그아웃
  // =========================
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
      className="colorize-page"
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
        <motion.h1 className="main-title">Re:Memory AI Colorization</motion.h1>
        <motion.p className="subtitle">흑백 사진을 AI로 컬러화하세요.</motion.p>

        {/* 로딩 */}
        {loading && (
          <div className="loading-spinner">
            <p>이미지를 컬러화하는 중입니다...</p>
          </div>
        )}

        {/* 업로드 박스 */}
        {!originalImage && !loading && (
          <motion.div
            className="upload-box"
            onClick={() => fileInputRef.current.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            whileHover={{ scale: 1.02 }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <p>이미지를 업로드하려면 클릭하거나 드래그하세요</p>
            <p style={{ fontSize: "0.8rem", color: "#999" }}>
              (JPEG, PNG, BMP 지원 | 최대 10MB)
            </p>
          </motion.div>
        )}

        {/* 반반 비교 */}
        {originalImage && colorizedImage && (
          <div className="comparison-container side-by-side">
            <div className="image-wrapper">
              <img src={originalImage} alt="Original" />
              <p className="label">원본</p>
            </div>
            <div className="image-wrapper">
              <img src={colorizedImage} alt="Colorized" />
              <p className="label">컬러화</p>
            </div>
          </div>
        )}

        {/* 버튼 영역 */}
        {colorizedImage && (
          <div className="button-area">
            <motion.button
              className="restore-btn"
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              컬러화된 이미지 다운로드 ⬇
            </motion.button>

            <motion.button
              className="restore-btn secondary"
              onClick={handleRetry}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ marginLeft: "1rem", background: "#555" }}
            >
              다른 사진 컬러화 ↩
            </motion.button>
          </div>
        )}
      </main>
    </motion.div>
  );
}
