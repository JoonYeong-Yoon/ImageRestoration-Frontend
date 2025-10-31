// src/lib/AuthContext.js (이 파일은 새로 만들어야 합니다.)

import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

// 1. Context 객체 생성
export const AuthContext = createContext();

// 2. Provider 컴포넌트 정의
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🌟 핵심: 앱 로드 시 쿠키를 이용해 로그인 상태를 확인하고 상태를 복구합니다.
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // 이 경로를 실제 서버의 '인증 상태 확인' API 경로로 수정하세요.
        // 브라우저가 유효한 쿠키를 이 요청에 자동으로 첨부합니다.
        const response = await axios.get('/api/auth/status', { withCredentials: true }); 

        // 서버가 200 OK를 반환하면 로그인된 상태로 인식합니다.
        if (response.status === 200) {
          setIsLoggedIn(true); 
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        // 통신 오류나 인증 실패(401) 시 로그아웃 상태로 처리
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  // 로그인/로그아웃 함수 (실제 API 호출 로직 포함 필요)
  const login = () => { setIsLoggedIn(true); };
  const logout = () => { 
    // 실제로는 서버에 로그아웃 요청을 보내 쿠키를 삭제해야 합니다.
    setIsLoggedIn(false); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};