// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api/api";
import "./Signup.css";

export default function Signup({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 회원가입 실행
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다 ❌");
      return;
    }

    // 비밀번호 강도 검사 (선택사항)
    if (password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다 ❌");
      return;
    }

    setLoading(true);

    try {
      // 1. 회원가입
      const registerResponse = await registerUser(email, password);
      console.log("✅ 회원가입 성공:", registerResponse);

      // 2. 자동 로그인
      try {
        const loginResponse = await loginUser(email, password);
        console.log("✅ 자동 로그인 성공:", loginResponse);

        setIsLoggedIn(true);
        alert("회원가입 완료! 환영합니다! 🎉");
        navigate("/main/restore");
      } catch (loginError) {
        console.error("❌ 자동 로그인 실패:", loginError);
        alert(
          "회원가입은 성공했지만 자동 로그인에 실패했습니다. 로그인 페이지로 이동합니다."
        );
        navigate("/login");
      }
    } catch (error) {
      console.error("❌ 회원가입 실패:", error);

      // 에러 메시지 처리
      if (error.detail) {
        alert(error.detail);
      } else if (error.msg) {
        alert(error.msg);
      } else {
        alert("회원가입 실패 ❌ 입력값을 확인해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create Your Re:Memory Account</h1>
      <p className="signup-subtext">
        Preserve your moments with AI restoration.
      </p>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* 이메일 */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        {/* 비밀번호 */}
        <input
          type="password"
          placeholder="Password (6자 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        {/* 비밀번호 확인 */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "처리 중..." : "Sign Up"}
        </button>
      </form>

      <p className="login-link">
        이미 계정이 있으신가요?{" "}
        <span onClick={() => navigate("/login")}>로그인</span>
      </p>

      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </div>
  );
}
