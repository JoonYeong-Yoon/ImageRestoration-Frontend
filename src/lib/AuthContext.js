// src/lib/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ 로그인 API
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      console.log(res);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "로그인 실패");
      }

      const data = await res.json();
      // console.log("✅ 로그인 성공:", data);

      const userData = { email, token: data.access_token };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } catch (err) {
      console.error("❌ 로그인 오류:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ 회원가입 API
  const signup = async (email, password) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "회원가입 실패");
      }

      const data = await res.json();
      console.log("✅ 회원가입 성공:", data);
      return true;
    } catch (err) {
      console.error("❌ 회원가입 오류:", err);
      throw err;
    }
  };

  // ✅ 로그아웃
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        credentials: "include", // ✅ 쿠키 전송
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "로그아웃 실패");
      }

      // localStorage 및 상태 초기화
      localStorage.removeItem("user");
      setUser(null);
    } catch (err) {
      console.error("❌ 로그아웃 오류:", err);
      throw err;
    }
  };

  // ✅ 로그인 상태 복원
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
