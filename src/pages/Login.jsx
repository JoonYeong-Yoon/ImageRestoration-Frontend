import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ wouter → react-router-dom
import { useAuth } from "../lib/AuthContext";
import "../css/Login.css";

export default function Login() {
  const navigate = useNavigate(); // ✅ navigate 사용
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ 입력값 상관없이 로그인 성공 처리
      await login({
        uid: "auto-user",
        email: email || "guest@re-memory.com",
      });

      // ✅ 바로 /restore로 이동
      navigate("/main");
    } catch (e) {
      setError("로그인 처리 중 오류가 발생했습니다.");
      console.error("Login error:", e);
    }
  };

  const handleSignup = () => {
    console.log("Signup clicked. Redirecting to /signup (Temporary)");
    setError("회원가입 기능은 아직 구현되지 않았습니다.");
  };

  return (
    <div className="login-container min-h-screen flex flex-col justify-center items-center bg-black text-white p-4">
      <h1 className="login-title text-5xl font-extrabold mb-2">
        Login to Re:Memory
      </h1>
      <p className="login-subtitle text-lg text-gray-400 mb-10">
        Restore what matters most.
      </p>

      <form
        onSubmit={handleLogin}
        className="login-form w-full max-w-sm flex flex-col gap-6"
      >
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "로딩 중..." : "Sign In"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={handleSignup}
          className="text-gray-400 text-sm hover:text-white transition-colors"
        >
          계정이 없으신가요?{" "}
          <span className="underline font-medium">회원가입</span>
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-6 block text-gray-500 hover:text-white transition-colors text-sm"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
