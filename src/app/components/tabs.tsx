import { MessageCircle, Upload, Mic } from "lucide-react";

interface TabsProps {
  activeTab: "type" | "upload" | "voice";
  onTabChange: (tab: "type" | "upload" | "voice") => void;
}

export function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex gap-3 bg-[#FFF3E0] p-2 rounded-2xl border-2 border-border">
      <button
        onClick={() => onTabChange("type")}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all text-sm font-semibold ${
          activeTab === "type"
            ? "bg-white text-foreground shadow-lg border-2 border-[#FF8C42]"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <MessageCircle className="w-5 h-5" />
        <span>Type</span>
      </button>
      <button
        onClick={() => onTabChange("upload")}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all text-sm font-semibold ${
          activeTab === "upload"
            ? "bg-white text-foreground shadow-lg border-2 border-[#FF8C42]"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Upload className="w-5 h-5" />
        <span>Upload</span>
      </button>
      <button
        onClick={() => onTabChange("voice")}
        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all text-sm font-semibold ${
          activeTab === "voice"
            ? "bg-white text-foreground shadow-lg border-2 border-[#FF8C42]"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Mic className="w-5 h-5" />
        <span>Voice</span>
      </button>
    </div>
  );
}