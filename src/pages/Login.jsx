// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import "./Login.css";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 로그인 실행
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginUser(email, password);
      console.log("✅ 로그인 성공:", response);

      // 세션 토큰은 쿠키에 자동 저장됨
      setIsLoggedIn(true);
      alert("로그인 성공! 🎉");
      navigate("/main/restore");
    } catch (error) {
      console.error("❌ 로그인 실패:", error);

      // 에러 메시지 처리
      if (error.detail) {
        alert(error.detail);
      } else if (error.msg) {
        alert(error.msg);
      } else {
        alert("이메일 또는 비밀번호가 틀렸습니다 ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login to Re:Memory</h1>
      <p className="login-subtext">Restore what matters most.</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "로그인 중..." : "Sign In"}
        </button>
      </form>

      <p className="signup-link">
        계정이 없으신가요?{" "}
        <span onClick={() => navigate("/signup")}>회원가입</span>
      </p>

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </div>
  );
}
