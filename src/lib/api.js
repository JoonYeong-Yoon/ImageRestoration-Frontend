// src/lib/api.js (오류를 제거한 코드)

import axios from "axios";

const BASE_URL = "http://192.168.0.51:5000/api";

// ✅ 로그인 요청
export const loginUser = async (email, password) => {
  return await axios.post(`${BASE_URL}/auth/login`, { email, password });
};

// ✅ 회원가입 요청
export const registerUser = async (fullName, email, password) => {
  return await axios.post(`${BASE_URL}/auth/register`, {
    fullName,
    email,
    password,
  });
};

// ✅ 흑백 -> 컬러 이미지 변환 요청
export const colorizeImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return await axios.post(`${BASE_URL}/image/colorize`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// 🌟 사진 복원 요청 함수 (이전에 추가한 함수)
export const restorePhoto = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return await axios.post(`${BASE_URL}/image/restore`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};