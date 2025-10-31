// ✅ src/api/api.js
import axios from "axios";

// ✅ Flask 백엔드 주소 (IP나 포트 맞게 수정)
const api = axios.create({
  baseURL: "http://192.168.0.51:5000/api", // 🧠 백엔드 Flask 서버 주소
  withCredentials: true, // ✅ 이거 꼭 있어야 쿠키가 백엔드로 전송됨
});

// ✅ 회원가입
export const registerUser = (email, password) =>
  api.post("/auth/register", { email, password });

// ✅ 로그인
export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password });

// ✅ 로그아웃
export const logoutUser = () => api.post("/auth/logout");


// ✅ 로그인 상태 확인
export const checkLoginStatus = () => api.get("/auth/status");

export default api;
