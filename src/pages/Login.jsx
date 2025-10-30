import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../lib/api"; // ✅ API 연동
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ 로그인 실행
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(email, password); // ✅ 백엔드 요청
      console.log("로그인 성공:", res.data);

      // ✅ 토큰 저장
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userEmail", email);

      alert("로그인 성공! ✅");
      navigate("/main"); // 로그인 후 이동
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("이메일 또는 비밀번호가 틀렸습니다 ❌");
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
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
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
