import axios from "axios";

const BASE_URL = "http://192.168.0.51:5000/api";

// ✅ 로그인 요청
export const loginUser = async (email, password) => {
  return await axios.post(`${BASE_URL}/auth/login`, { email, password });
};

// ✅ 회원가입 요청
export const registerUser = async (email, password) => {
  return await axios.post(`${BASE_URL}/auth/register`, { email, password });
};

// ✅ 흑백 -> 컬러 이미지 변환 요청
export const colorizeImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return await axios.post(`${BASE_URL}/image/colorize`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
