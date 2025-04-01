import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Loader2 } from "lucide-react";

interface KeywordInputProps {
  onGeneratePrompts?: (keywords: string[]) => Promise<void>;
  isGenerating?: boolean;
  promptCount?: number;
}

const KeywordInput = ({
  onGeneratePrompts = async () => {},
  isGenerating = false,
  promptCount = 0,
}: KeywordInputProps) => {
  const [keywords, setKeywords] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "generating" | "completed">(
    "idle",
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const handleGenerateClick = async () => {
    if (!keywords.trim() || isGenerating) return;

    const keywordArray = keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
    if (keywordArray.length === 0) return;

    setStatus("generating");
    try {
      await onGeneratePrompts(keywordArray);
      setStatus("completed");
    } catch (error) {
      console.error("Error generating prompts:", error);
      setStatus("idle");
    }
  };

  return (
    <Card className="p-6 bg-white shadow-md rounded-lg w-full">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">
            Enter Keywords for Prompt Generation
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Enter keywords separated by commas to generate inappropriate prompts
            for testing.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <div>
            <Input
              placeholder="Enter keywords separated by commas (e.g., violence, weapons, etc.)"
              value={keywords}
              onChange={handleInputChange}
              className="w-full"
              disabled={isGenerating || status === "generating"}
            />
            <p className="text-xs text-gray-500 mt-1">
              Multiple keywords should be separated by commas.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {promptCount > 0 && (
                <Badge variant="outline" className="bg-gray-100">
                  {promptCount} prompts will be generated
                </Badge>
              )}
            </div>

            <Button
              onClick={handleGenerateClick}
              disabled={
                !keywords.trim() || isGenerating || status === "generating"
              }
              className="min-w-[120px]"
            >
              {isGenerating || status === "generating" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>

          {status === "completed" && (
            <div className="text-sm text-green-600 font-medium mt-2">
              Completed
            </div>
          )}

          {status === "generating" && !isGenerating && (
            <div className="text-sm text-amber-600 font-medium mt-2">
              Creating prompts...
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default KeywordInput;
