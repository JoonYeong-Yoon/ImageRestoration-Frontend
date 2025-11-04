import { useState, useRef, useEffect } from "react";
import { Upload, ChevronDown } from "lucide-react";
import { Button } from "../components/button";

const Colorize = ({ selectedImage, setSelectedImage }) => {
  const fileInputRef = useRef(null);
  const [colorizedImage, setColorizedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ 업로드된 파일 객체
  const [selectedFile, setSelectedFile] = useState(null);

  // ✅ 모델 선택 상태
  const [selectedModel, setSelectedModel] = useState("UNET");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUploadClick = () => fileInputRef.current?.click();

  // ✅ FastAPI 서버에 실제 요청 (FileResponse용)
  const handleConvert = async () => {
    if (!selectedFile) {
      console.error("⚠️ 변환할 파일 객체가 없습니다. 이미지를 선택해 주세요.");
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("model", selectedModel);

      console.log(`🧠 선택된 모델: ${selectedModel}`);

      const response = await fetch(
        "http://127.0.0.1:8000/api/images/colorize",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error(`서버 응답 실패: ${response.status}`);

      // ✅ FileResponse로 온 이미지를 blob으로 받기
      const blob = await response.blob();

      // ✅ Blob을 브라우저에서 표시 가능한 URL로 변환
      const imageUrl = URL.createObjectURL(blob);
      setColorizedImage(imageUrl);

      console.log(`✅ ${selectedModel} 모델 변환 완료`);
    } catch (err) {
      console.error("❌ 변환 중 오류:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result);
        setColorizedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setDropdownOpen(false);
    console.log(`🎯 모델 선택됨: ${model}`);
  };

  return (
    <main className="flex-1 overflow-auto bg-black text-gray-200">
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
            className="border-2 border-dashed rounded-xl p-20 cursor-pointer border-gray-700 bg-[#0d0d0d] hover:bg-[#111]"
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/bmp"
              onChange={handleFileSelect}
            />
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-24 h-24 border-2 border-[#444] bg-[#111] rounded-lg flex items-center justify-center">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-lg text-white font-medium">
                이미지를 업로드하려면 클릭하세요
              </p>
              <p className="text-sm text-gray-500">
                (JPEG, PNG, BMP 지원 | 최대 10MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 원본 */}
              <div className="space-y-3">
                <h3 className="text-sm text-gray-400">원본 (흑백)</h3>
                <div className="aspect-square rounded-lg border border-[#333] bg-[#111] overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* 변환 결과 */}
              <div className="space-y-3">
                <h3 className="text-sm text-gray-400">컬러 변환 결과</h3>
                <div className="aspect-square rounded-lg border border-[#333] bg-[#111] flex items-center justify-center overflow-hidden">
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
            <div className="flex justify-center items-center gap-4 mt-4 relative">
              <Button
                variant="outline"
                className="text-white border-gray-500 hover:bg-gray-800"
                onClick={() => {
                  setSelectedImage(null);
                  setColorizedImage(null);
                  setSelectedFile(null);
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
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = colorizedImage;
                    link.download = `colorized_${
                      selectedFile?.name || "image"
                    }.png`;
                    link.click();
                  }}
                >
                  다운로드
                </Button>
              )}

              {/* 모델 선택 드롭다운 */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-600 rounded text-gray-300 hover:text-white text-sm"
                >
                  모델:{" "}
                  <span className="text-blue-400 font-medium">
                    {selectedModel}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute bottom-10 left-0 w-32 bg-[#1a1a1a] border border-gray-700 rounded shadow-lg">
                    {["UNET", "ECCV16"].map((model) => (
                      <button
                        key={model}
                        onClick={() => handleModelSelect(model)}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                          selectedModel === model
                            ? "text-white font-medium"
                            : "text-gray-300"
                        }`}
                      >
                        {model}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Colorize;
