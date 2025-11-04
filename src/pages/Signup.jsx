// src/pages/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("모든 항목을 입력해주세요.");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signup(email, password); // ✅ 백엔드 회원가입 API 호출
      alert("✅ 회원가입 완료! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      console.error("❌ 회원가입 실패:", err);
      setError("회원가입 실패: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-3xl font-bold mb-3 text-center">
        Create Your <span className="text-white">Re:Memory</span> Account
      </h1>
      <p className="text-gray-400 mb-8 text-center">
        Preserve your moments with AI restoration.
      </p>

      <form
        onSubmit={handleSignup}
        className="w-full max-w-xs flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-md bg-[#111] border border-[#333] focus:outline-none focus:border-white"
        />

        <input
          type="password"
          placeholder="Password (6자 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-md bg-[#111] border border-[#333] focus:outline-none focus:border-white"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 rounded-md bg-[#111] border border-[#333] focus:outline-none focus:border-white"
        />

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-200 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-gray-400 mt-6">
        이미 계정이 있으신가요?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-white hover:underline cursor-pointer"
        >
          로그인
        </span>
      </p>

      <p
        onClick={() => navigate("/")}
        className="text-gray-500 text-sm mt-4 cursor-pointer hover:text-gray-300"
      >
        ← Back to Home
      </p>
    </div>
  );
}
