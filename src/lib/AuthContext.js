import React, { createContext, useContext, useState } from 'react';

// 1. Context 객체 생성
const AuthContext = createContext(null);

// 2. 이 Context를 사용하는 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Provider 컴포넌트 생성
export const AuthProvider = ({ children }) => {
  // 실제 로그인 상태와 사용자 정보를 관리하는 state
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  // 로그인 함수 예시
  const login = (username, password) => {
    setIsLoading(true);
    // 실제 인증 로직 (API 호출 등)
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser({ id: 1, name: username });
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  // 로그아웃 함수 예시
  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    isLoggedIn: !!user, // user 객체가 있으면 true
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 이 파일을 생성하고 나면 Login.jsx에서 AuthContext 오류가 사라질 것입니다.
