// src/api/api.js
import axios from "axios";

// ✅ 백엔드 API 기본 URL
const BASE_URL = "http://localhost:8000/api";

// ✅ Axios 인스턴스 생성 (쿠키 자동 포함)
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 쿠키 자동 전송
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================
// 인증 관련 API
// =====================

/**
 * 회원가입
 * @param {string} email - 사용자 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise} 회원가입 결과
 */
export const registerUser = async (email, password) => {
  try {
    const response = await api.post("/auth/register", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * 로그인
 * @param {string} email - 사용자 이메일
 * @param {string} password - 비밀번호
 * @returns {Promise} 로그인 결과 (세션 토큰은 쿠키에 자동 저장)
 */
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * 로그아웃
 * @returns {Promise} 로그아웃 결과
 */
export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * 현재 사용자 정보 조회 (인증 확인용)
 * @returns {Promise} 사용자 정보
 */
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// =====================
// 이미지 처리 관련 API
// =====================

/**
 * 흑백 이미지를 컬러로 변환
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise} 변환된 이미지 URL
 */
export const colorizeImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/images/colorize", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // 이미지 파일 응답
    });

    // Blob을 URL로 변환
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/**
 * 손상된 이미지 복원
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise} 복원된 이미지 URL
 */
export const restoreImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/images/restore", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob", // 이미지 파일 응답
    });

    // Blob을 URL로 변환
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// =====================
// 인터셉터 (선택사항)
// =====================

// 요청 인터셉터: 로그 출력
api.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.url} - Success`);
    return response;
  },
  (error) => {
    console.error(
      `[API Error] ${error.config?.url} - ${error.response?.status}`,
      error.response?.data
    );

    // 401 에러 시 로그아웃 처리
    if (error.response?.status === 401) {
      console.warn("인증 실패: 로그인이 필요합니다.");
      // 필요시 자동 리다이렉트
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
