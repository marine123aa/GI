import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

interface TabNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const TabNavigation = ({
  activeTab = "bypass-prompt-generation",
  onTabChange = () => {},
}: TabNavigationProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    onTabChange(value);
  };

  return (
    <div className="w-full bg-white">
      <Tabs
        defaultValue={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full h-14 bg-gray-100 rounded-none border-b border-gray-200">
          <TabsTrigger
            value="bypass-prompt-generation"
            className="flex-1 h-full text-base font-medium data-[state=active]:bg-white data-[state=active]:border-t-2 data-[state=active]:border-t-blue-600"
          >
            Bypass Prompt Generation
          </TabsTrigger>
          <TabsTrigger
            value="prompt-viewing"
            className="flex-1 h-full text-base font-medium data-[state=active]:bg-white data-[state=active]:border-t-2 data-[state=active]:border-t-blue-600"
          >
            Prompt Viewing
          </TabsTrigger>
          <TabsTrigger
            value="image-screening"
            className="flex-1 h-full text-base font-medium data-[state=active]:bg-white data-[state=active]:border-t-2 data-[state=active]:border-t-blue-600"
          >
            Image Screening
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bypass-prompt-generation" className="mt-0 p-4">
          {/* BypassPromptGeneration component will be rendered here */}
          <div className="p-6 border rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4">
              Bypass Prompt Generation
            </h2>
            <p className="text-gray-500">
              This tab allows you to create and test potentially inappropriate
              prompts.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="prompt-viewing" className="mt-0 p-4">
          {/* PromptViewing component will be rendered here */}
          <div className="p-6 border rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Prompt Viewing</h2>
            <p className="text-gray-500">
              This tab allows you to browse saved prompts with date filtering
              and category selection.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="image-screening" className="mt-0 p-4">
          {/* ImageScreening component will be rendered here */}
          <div className="p-6 border rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Image Screening</h2>
            <p className="text-gray-500">
              This tab allows you to upload and analyze images for
              appropriateness across various categories.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabNavigation;
