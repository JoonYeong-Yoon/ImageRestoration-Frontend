import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import LoginModal from "./LoginModal";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  //useEffect(() => {
  //  const isLoggedIn = localStorage.getItem("userToken");
  //  if (isLoggedIn) {
  //    navigate("/main"); // 이미 로그인된 경우 main 페이지로 이동
  //  }
  //}, [navigate]);

  // ✅ 3. 로그인 시도
  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      alert("로그인 성공 🎉");

      // ✅ 로그인 성공 시 localStorage에 저장
      localStorage.setItem("userToken", "true");
      localStorage.setItem("userEmail", email);

      navigate("/main");
    } else {
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
