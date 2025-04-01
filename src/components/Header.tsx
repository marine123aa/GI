import React from "react";
import { Shield, Image } from "lucide-react";
import { cn } from "../lib/utils";

interface HeaderProps {
  title?: string;
  className?: string;
}

const Header = ({
  title = "AI Image Appropriateness Verification Platform",
  className,
}: HeaderProps) => {
  return (
    <header
      className={cn(
        "w-full h-20 bg-slate-900 text-white flex items-center px-6 shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center bg-slate-800 p-2 rounded-md">
          <Shield className="h-8 w-8 text-blue-400 mr-1" />
          <Image className="h-7 w-7 text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="text-sm text-slate-300">
          <span className="block">Visual Solution Team</span>
          <span className="block text-xs opacity-70">
            Image Verification System
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
