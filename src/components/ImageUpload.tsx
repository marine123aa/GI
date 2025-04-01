import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FolderOpen, Play, Check } from "lucide-react";

interface ImageUploadProps {
  onUpload?: (files: FileList) => void;
  onStartScreening?: () => void;
  isScreening?: boolean;
  isCompleted?: boolean;
}

const ImageUpload = ({
  onUpload = () => {},
  onStartScreening = () => {},
  isScreening = false,
  isCompleted = false,
}: ImageUploadProps) => {
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
      setSelectedFolder(
        Array.from(e.target.files)
          .map((file) => file.name)
          .join(", "),
      );
      onUpload(e.target.files);
    }
  };

  const handleStartScreening = () => {
    if (files) {
      onStartScreening();
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">이미지 폴더 선택</h2>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="folder-select">이미지 폴더 경로</Label>
          <div className="flex items-center gap-2">
            <Input
              id="folder-select"
              value={selectedFolder}
              placeholder="이미지 폴더를 선택하세요"
              readOnly
              className="flex-1"
            />
            <div className="relative">
              <Input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                webkitdirectory=""
                directory=""
                multiple
              />
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2"
              >
                <FolderOpen size={16} />
                폴더 선택
              </Button>
            </div>
          </div>
        </div>

        {selectedFolder && (
          <div className="mt-4">
            <Button
              onClick={handleStartScreening}
              disabled={isScreening || isCompleted}
              className="w-full flex items-center justify-center gap-2"
            >
              {isCompleted ? (
                <>
                  <Check size={16} />
                  완료됨
                </>
              ) : isScreening ? (
                <>검사 중...</>
              ) : (
                <>
                  <Play size={16} />
                  검사 시작
                </>
              )}
            </Button>
          </div>
        )}

        {isScreening && !isCompleted && (
          <div className="mt-2 text-sm text-center text-gray-500">
            이미지 검사 중입니다. 잠시만 기다려주세요...
          </div>
        )}

        {isCompleted && (
          <div className="mt-2 text-sm text-center text-green-600">
            이미지 검사가 완료되었습니다. 결과를 확인하세요.
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
