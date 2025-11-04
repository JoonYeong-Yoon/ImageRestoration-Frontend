import { useState, useRef } from "react";
import { Upload } from "lucide-react";

import { Button } from "../components/button";

const Colorize = ({ selectedImage, setSelectedImage }) => {
  const fileInputRef = useRef(null);
  const [colorizedImage, setColorizedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleConvert = () => {
    if (!selectedImage) return;
    setIsProcessing(true);

    // ✅ 시뮬레이션 (AI 변환 로직 자리)
    setTimeout(() => {
      setColorizedImage(selectedImage);
      setIsProcessing(false);
    }, 3000);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result);
        setColorizedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <main
        className="flex-1 overflow-auto"
        style={{
          backgroundColor: "#000",
        }}
      >
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold mb-2 text-white">
              Re:Memory AI Colorization
            </h1>
            <p className="text-sm text-gray-400">
              흑백 사진에 생명을 불어넣어 보세요.
            </p>
          </div>

          {!selectedImage ? (
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 원본 이미지 */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-400">
                    원본 (흑백)
                  </h3>
                  <div className="aspect-square rounded-lg border overflow-hidden bg-[#111] border-[#333]">
                    <img
                      src={selectedImage}
                      alt="Original"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* 변환된 이미지 */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-400">
                    컬러 변환 결과
                  </h3>
                  <div className="aspect-square rounded-lg border overflow-hidden bg-[#111] border-[#333] flex items-center justify-center">
                    {isProcessing ? (
                      <div className="text-center space-y-3">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="text-sm text-gray-400">변환 중...</p>
                      </div>
                    ) : colorizedImage ? (
                      <img
                        src={colorizedImage}
                        alt="Colorized"
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
                    setColorizedImage(null);
                  }}
                >
                  다른 이미지 선택
                </Button>

                {!colorizedImage && !isProcessing && (
                  <Button
                    className="bg-blue-700 hover:bg-blue-800"
                    onClick={handleConvert}
                  >
                    변환
                  </Button>
                )}

                {colorizedImage && (
                  <Button
                    className="bg-blue-700 hover:bg-blue-800"
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
    </>
  );
};

export default Colorize;
