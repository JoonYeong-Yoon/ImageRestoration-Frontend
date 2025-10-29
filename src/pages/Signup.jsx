import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(""); // 생년월일 상태
  const [gender, setGender] = useState(""); // 성별 상태
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 여부
  const [users, setUsers] = useState([]);

  // 이메일 인증 함수 (예시)
  const sendEmailVerification = () => {
    alert("이메일 인증이 완료되었습니다 🎉");
    setIsEmailVerified(true); // 이메일 인증 완료
  };

  // 회원가입 처리
  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다 ❌");
      return;
    }

    // 이메일 인증 확인
    if (!isEmailVerified) {
      alert("이메일 인증이 필요합니다 ❌");
      return;
    }

    const newUser = { email, password, fullName, phone, dob, gender };

    // 기존 유저 목록 불러오기
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // 이미 존재하는 이메일 검사
    const userExists = storedUsers.some((user) => user.email === email);

    if (userExists) {
      alert("이미 존재하는 이메일입니다 ❌");
      return;
    }

    // 새 유저 추가 및 저장
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("회원가입 완료 🎉 자동으로 로그인됩니다.");

    // ✅ 자동 로그인 상태 저장
    localStorage.setItem("userToken", "true");
    localStorage.setItem("userEmail", email);

    navigate("/restore");
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create Your Re:Memory Account</h1>
      <p className="signup-subtext">
        Preserve your moments with AI restoration.
      </p>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* 이름 (Full Name) */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        {/* 이메일 (Email) */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* 비밀번호 (Password) */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* 비밀번호 확인 (Confirm Password) */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* 전화번호 (Phone Number) */}
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* 생년월일 (Date of Birth) */}
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

        {/* 성별 (Gender) */}
        <div className="gender">
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* 이메일 인증 버튼 */}
        <button type="button" onClick={sendEmailVerification}>
          Send Email Verification
        </button>

        {/* 이메일 인증 여부 확인 */}
        {isEmailVerified ? (
          <p className="verified">Email verified ✅</p>
        ) : (
          <p className="unverified">Email not verified ❌</p>
        )}

        <button type="submit">Sign Up</button>
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
