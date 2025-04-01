import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import AnalysisResults from "./AnalysisResults";

interface ImageScreeningProps {
  onSaveResults?: (results: any) => void;
}

const ImageScreening = ({ onSaveResults = () => {} }: ImageScreeningProps) => {
  const [isScreening, setIsScreening] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileList | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Handle file upload from ImageUpload component
  const handleUpload = (files: FileList) => {
    setUploadedFiles(files);
    setIsCompleted(false);
  };

  // Start the screening process
  const handleStartScreening = () => {
    setIsScreening(true);

    // Simulate screening process with timeout
    setTimeout(() => {
      setIsScreening(false);
      setIsCompleted(true);

      // In a real implementation, this would process the files and generate results
      // Then call onSaveResults with the processed data
      onSaveResults({
        date: new Date().toISOString().split("T")[0],
        files: uploadedFiles
          ? Array.from(uploadedFiles).map((f) => f.name)
          : [],
        results: [],
      });
    }, 3000);
  };

  // Handle date filter changes for results
  const handleFilterChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    // In a real implementation, this would filter results based on date range
  };

  // Handle download of analysis results
  const handleDownloadResults = () => {
    // In a real implementation, this would generate and download an Excel file
    console.log(
      "Downloading results for date range:",
      startDate,
      "to",
      endDate,
    );
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6 flex flex-col space-y-6">
      <h1 className="text-2xl font-bold">부적절 이미지 검사</h1>
      <p className="text-gray-600">
        이미지를 업로드하고 AI 모델을 사용하여 부적절한 콘텐츠를 검사합니다. 각
        카테고리별로 1-5 점수로 평가됩니다.
      </p>

      <div className="grid grid-cols-1 gap-6">
        {/* Image Upload Section */}
        <ImageUpload
          onUpload={handleUpload}
          onStartScreening={handleStartScreening}
          isScreening={isScreening}
          isCompleted={isCompleted}
        />

        {/* Analysis Results Section */}
        <AnalysisResults
          onFilterChange={handleFilterChange}
          onDownload={handleDownloadResults}
        />
      </div>
    </div>
  );
};

export default ImageScreening;
