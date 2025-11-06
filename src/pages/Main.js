import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Palette, ImageIcon, ArrowLeft } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import Colorize from "../components/Colorize";
import Restore from "../components/Restore";

export default function Main() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("colorize");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    console.log(`탭 이동: /main/${tab}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("❌ 로그아웃 오류:", err);
    }
  };

  return (
    <div
      className="flex h-screen"
      style={{
        backgroundColor: "#000",
        color: "#eaeaea",
      }}
    >
      {/* ✅ 왼쪽 사이드바 */}
      <aside
        className="w-64 shrink-0"
        style={{
          backgroundColor: "#1a1a1a",
          borderRight: "1px solid #2a2a2a",
        }}
      >
        <div className="p-6">
          <h1 className="text-xl font-semibold mb-8 text-white">Re:Memory</h1>

          <nav className="space-y-2">
            <button
              onClick={() => handleTabClick("colorize")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${
                activeTab === "colorize"
                  ? "bg-blue-700 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span> 흑백 → 컬러 변환</span>
            </button>

            <button
              onClick={() => handleTabClick("restore")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${
                activeTab === "restore"
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span> 손상 복원</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* ✅ 오른쪽 메인 영역 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 상단 헤더 */}
        <header
          className="shrink-0"
          style={{
            backgroundColor: "#111",
            borderBottom: "1px solid #222",
          }}
        >
          <div className="px-6 py-4 flex items-center justify-between">
            {/* 왼쪽 - 홈 버튼 */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>

            {/* 오른쪽 - 로그아웃만 유지 ✅ */}
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/30 hover:bg-white/10"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        {activeTab === "colorize" ? (
          <Colorize
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        ) : (
          <Restore />
        )}
      </div>
    </div>
  );
}
