import React, { useState } from "react";
import Header from "./Header";
import TabNavigation from "./TabNavigation";
import BypassPromptGeneration from "./BypassPromptGeneration";
import PromptViewing from "./PromptViewing";
import ImageScreening from "./ImageScreening";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(
    "bypass-prompt-generation",
  );

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-1 flex flex-col">
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        <div className="flex-1 p-4">
          {activeTab === "bypass-prompt-generation" && (
            <BypassPromptGeneration />
          )}

          {activeTab === "prompt-viewing" && <PromptViewing />}

          {activeTab === "image-screening" && (
            <ImageScreening
              onSaveResults={(results) => {
                // In a real implementation, this would handle saving results to the database
                console.log("Saving results:", results);
              }}
            />
          )}
        </div>
      </main>

      <footer className="bg-slate-900 text-white p-4 text-center text-sm">
        <p>
          AI Image Appropriateness Verification Platform &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <p className="text-xs text-slate-400 mt-1">Visual Solution Team</p>
      </footer>
    </div>
  );
};

export default Home;
