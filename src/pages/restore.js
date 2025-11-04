import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Palette, ImageIcon, Upload, ArrowLeft } from "lucide-react";

export default function RestorePage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const [activeTab, setActiveTab] = useState("restore");

  // ✅ 파일 선택
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ 업로드 버튼 클릭
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ 변환 시뮬레이션 (3초 후 처리 완료)
  const handleConvert = () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    setTimeout(() => {
      setProcessedImage(selectedImage);
      setIsProcessing(false);
    }, 3000);
  };

  // ✅ 탭 이동
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "colorize") navigate("/main/colorize");
    else if (tab === "restore") navigate("/main/restore");
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
          <h1 className="text-xl font-semibold mb-8 text-white">Image Lab</h1>

          <nav className="space-y-2">
            {/* 흑백→컬러 변환 */}
            <button
              onClick={() => handleTabClick("colorize")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${
                activeTab === "colorize"
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span> 흑백 → 컬러 변환</span>
            </button>

            {/* 사진 복원 */}
            <button
              onClick={() => handleTabClick("restore")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm transition-colors ${
                activeTab === "restore"
                  ? "bg-green-700 text-white"
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
              <Button variant="ghost" size="sm" onClick={() => navigate("/home")}>
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

        {/* ✅ 메인 콘텐츠 영역 */}
        <main
          className="flex-1 overflow-auto"
          style={{
            backgroundColor: "#000",
          }}
        >
          <div className="container mx-auto px-6 py-8 max-w-6xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold mb-2 text-white">
                Re:Memory AI Restoration
              </h1>
              <p className="text-sm text-gray-400">
                시간 잃어버린 추억을 되살려요.
              </p>
            </div>

            {/* 업로드 / 결과 영역 */}
            {!selectedImage ? (
              // --- 업로드 화면 ---
              <div
                onClick={handleUploadClick}
                className="border-2 border-dashed rounded-xl p-20 cursor-pointer transition-colors"
                style={{
                  borderColor: "#333",
                  backgroundColor: "#0d0d0d",
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/bmp"
                  onChange={handleFileSelect}
                />
                <div className="flex flex-col items-center gap-4 text-center">
                  <div
                    className="w-24 h-24 rounded-lg flex items-center justify-center"
                    style={{
                      border: "2px solid #444",
                      backgroundColor: "#111",
                    }}
                  >
                    <Upload className="w-12 h-12 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg font-medium mb-1 text-white">
                      이미지를 업로드하려면 클릭하세요
                    </p>
                    <p className="text-sm text-gray-500">
                      (JPEG, PNG, BMP 지원 | 최대 10MB)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // --- 비교 화면 ---
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 원본 이미지 */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-400">
                      원본 이미지
                    </h3>
                    <div className="aspect-square rounded-lg border overflow-hidden bg-[#111] border-[#333]">
                      <img
                        src={selectedImage}
                        alt="Original"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* 복원된 이미지 */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-400">
                      복원된 이미지
                    </h3>
                    <div className="aspect-square rounded-lg border overflow-hidden bg-[#111] border-[#333] flex items-center justify-center">
                      {isProcessing ? (
                        <div className="text-center space-y-3">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
                          <p className="text-sm text-gray-400">처리 중...</p>
                        </div>
                      ) : processedImage ? (
                        <img
                          src={processedImage}
                          alt="Restored"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <p className="text-sm text-gray-500">
                          변환 버튼을 눌러주세요
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* 버튼 영역 */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    className="text-white border-gray-500 hover:bg-gray-800"
                    onClick={() => {
                      setSelectedImage(null);
                      setProcessedImage(null);
                    }}
                  >
                    다른 이미지 선택
                  </Button>

                  {!processedImage && !isProcessing && (
                    <Button
                      className="bg-green-700 hover:bg-green-800"
                      onClick={handleConvert}
                    >
                      변환
                    </Button>
                  )}

                  {processedImage && (
                    <Button
                      className="bg-green-700 hover:bg-green-800"
                      onClick={() => console.log("다운로드 클릭")}
                    >
                      다운로드
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
