import React, { useState } from "react";
import FilterSection from "./FilterSection";
import PromptList from "./PromptList";

interface PromptViewingProps {
  className?: string;
}

const PromptViewing: React.FC<PromptViewingProps> = ({ className = "" }) => {
  const [dateRange, setDateRange] = useState<{
    start: string;
    end: string;
  }>({
    start: "",
    end: "",
  });

  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, boolean>
  >({});

  const handleDateRangeChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    setDateRange({
      start: range.from ? formatDateToString(range.from) : "",
      end: range.to ? formatDateToString(range.to) : "",
    });
  };

  const handleCategoryChange = (categories: Record<string, boolean>) => {
    setSelectedCategories(categories);
  };

  // Helper function to format Date to string in YYYYMMDD format
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  return (
    <div className={`w-full h-full p-6 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Prompt Viewing</h1>
        <p className="text-gray-500">
          Browse saved prompts with date filtering and category selection,
          download results as Excel.
        </p>

        <div className="space-y-6">
          {/* Filter Section */}
          <FilterSection
            onDateRangeChange={handleDateRangeChange}
            onCategoryChange={handleCategoryChange}
          />

          {/* Prompt List */}
          <PromptList
            dateRange={dateRange}
            selectedCategories={selectedCategories}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptViewing;
