import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Palette, ImageIcon, Upload, ArrowLeft } from "lucide-react";
import Colorize from "../components/Colorize";
import Restore from "../components/Restore";
export default function Main() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("colorize");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "colorize") console.log("탭 이동: /main/colorize");
    else if (tab === "restore") console.log("탭 이동: /main/restore");
  };

  return (
    <div
      className="flex h-screen"
      style={{
        backgroundColor: "#000", // 메인 배경
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
          <h1 className="text-xl font-semibold mb-8 text-white">Image Lab</h1>

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
              <span> 사진 복원</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* ✅ 오른쪽 메인 영역 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <header
          className="shrink-0"
          style={{
            backgroundColor: "#111",
            borderBottom: "1px solid #222",
          }}
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <h2 className="text-lg font-semibold text-white">Re:Memory</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/30 hover:bg-white/10"
              onClick={() => console.log("Logout clicked")}
            >
              Logout
            </Button>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        {activeTab === "colorize" ? (
          <>
            <Colorize
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </>
        ) : (
          <Restore />
          // <p className="text-white text-center mt-10">aaa</p>
        )}
      </div>
    </div>
  );
}
