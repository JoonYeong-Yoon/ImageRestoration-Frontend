import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../lib/api"; // ✅ 백엔드 API
import axios from "axios"; // ✅ axios 직접 추가
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // ✅ 이메일 인증 placeholder
  const sendEmailVerification = () => {
    alert("이메일 인증 완료 🎉");
    setIsEmailVerified(true);
  };
  // const sendEmailVerification = async () => {
  //   const res = await axios.post("/auth/send-email", { email });

  //   alert("인증메일 전송 완료 ✅");
  // };

  // ✅ 회원가입 시도
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ 비밀번호 체크
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다 ❌");
      return;
    }

    // ✅ 이메일 인증 여부
    if (!isEmailVerified) {
      alert("이메일 인증이 필요합니다 ❌");
      return;
    }

    try {
      // ✅ 백엔드로 회원가입 요청
      //console.log = 내부 기록 / alert = 화면 알림
      const res = await axios.post(
        "http://192.168.0.51:5000/api/auth/register",
        {
          email,
          password,
          full_name: fullName,
        }
      );

      console.log("회원가입 성공:", res.data);

      alert("회원가입 성공! ✅");
      try {
        const loginRes = await axios.post(
          "http://192.168.0.51:5000/api/auth/login",
          {
            email,
            password,
          }
        );

        console.log("자동 로그인 성공:", loginRes.data);
        localStorage.setItem("user", JSON.stringify(loginRes.data)); // 토큰 저장 등
        navigate("/"); // 메인 화면으로 이동
      } catch (loginErr) {
        console.error("자동 로그인 실패:", loginErr);
        alert("자동 로그인 실패. 로그인 페이지로 이동합니다.");
        navigate("/login");
      }
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입 실패 ❌ 서버 연결 또는 입력값 확인 필요");
    }
  };
  return (
    <div className="signup-container">
      <h1 className="signup-title">Create Your Re:Memory Account</h1>
      <p className="signup-subtext">
        Preserve your moments with AI restoration.
      </p>

      <form className="signup-form" onSubmit={handleSubmit}>
        {/* 이름 */}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        {/* 이메일 */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* 비밀번호 */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* 비밀번호 확인 */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        /> */}

        {/*        
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

      
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
        </div> */}

        {/* 이메일 인증 */}
        <button type="button" onClick={sendEmailVerification}>
          Send Email Verification
        </button>

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
