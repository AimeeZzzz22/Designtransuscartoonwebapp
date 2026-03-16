import { useState } from "react";
import { Heart, MessageCircle, Upload, Mic, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { AIMascot } from "../components/ai-mascot";
import { AnalysisResults } from "../components/analysis-results";
import { Tabs } from "../components/tabs";

type AppState = "empty" | "loading" | "results";

type SafetyFlag = "none" | "abuse" | "coercion" | "threat" | "self_harm" | "other_risk";

type ConflictAnalysis = {
  partner_a_feelings: string[];
  partner_b_feelings: string[];
  partner_a_intent: string;
  partner_b_intent: string;
  misunderstanding: string;
  reframes: string[];
  next_prompt: string;
  safety_flag: SafetyFlag;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export function MainApp() {
  const [activeTab, setActiveTab] = useState<"type" | "upload" | "voice">("type");
  const [partnerAText, setPartnerAText] = useState("");
  const [partnerBText, setPartnerBText] = useState("");
  const [appState, setAppState] = useState<AppState>("empty");
  const [analysis, setAnalysis] = useState<ConflictAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!partnerAText.trim() || !partnerBText.trim()) {
      return;
    }

    setError(null);
    setAppState("loading");

    try {
      const res = await fetch(`${API_BASE}/analyze-conflict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          partner_a: partnerAText.trim(),
          partner_b: partnerBText.trim(),
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { detail?: string };
        throw new Error(data.detail ?? "Something went wrong. Please try again.");
      }

      const data = (await res.json()) as ConflictAnalysis;
      setAnalysis(data);
      setAppState("results");
    } catch (e: unknown) {
      const message =
        e instanceof Error && e.message
          ? e.message
          : "Unexpected error while calling the TransUs API.";
      setError(message);
      setAppState("empty");
    }
  };

  const handleReset = () => {
    setPartnerAText("");
    setPartnerBText("");
    setAnalysis(null);
    setError(null);
    setAppState("empty");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center shadow-lg shadow-[#FF8C42]/20">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">TransUs</h1>
              <p className="text-xs text-muted-foreground">Translate conflict into understanding</p>
            </div>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="space-y-12">
          {/* Input Section */}
          <div className="bg-white rounded-3xl p-10 border-2 border-border shadow-xl">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-foreground">Reflect on a conflict</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                Each partner can describe what was said, felt, or meant during the conversation
              </p>
            </div>

            {/* Tabs */}
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === "type" && (
                <div className="space-y-8">
                  {/* Partner A Input */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center shadow-md">
                        <span className="text-sm text-white font-bold">A</span>
                      </div>
                      <label className="text-base font-semibold text-foreground">Partner A</label>
                    </div>
                    <textarea
                      value={partnerAText}
                      onChange={(e) => setPartnerAText(e.target.value)}
                      placeholder="I felt ignored when you didn't reply to my messages..."
                      className="w-full h-40 px-6 py-4 bg-[#FFF9EE] border-2 border-border rounded-2xl resize-none focus:border-[#FF8C42] focus:outline-none transition-colors text-base"
                      disabled={appState === "loading"}
                    />
                  </div>

                  {/* Partner B Input */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7FC7AF] to-[#FFD166] flex items-center justify-center shadow-md">
                        <span className="text-sm text-white font-bold">B</span>
                      </div>
                      <label className="text-base font-semibold text-foreground">Partner B</label>
                    </div>
                    <textarea
                      value={partnerBText}
                      onChange={(e) => setPartnerBText(e.target.value)}
                      placeholder="I was overwhelmed and didn't mean to sound cold..."
                      className="w-full h-40 px-6 py-4 bg-[#FFF9EE] border-2 border-border rounded-2xl resize-none focus:border-[#7FC7AF] focus:outline-none transition-colors text-base"
                      disabled={appState === "loading"}
                    />
                  </div>
                </div>
              )}

              {activeTab === "upload" && (
                <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-3xl bg-[#FFF9EE]">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center shadow-lg mb-6">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Upload conversation</h3>
                  <p className="text-base text-muted-foreground mb-8">Drop text files or screenshots of your messages</p>
                  <button className="px-8 py-4 bg-gradient-to-r from-[#FF8C42] to-[#FF9EC5] text-white rounded-2xl hover:shadow-lg hover:shadow-[#FF8C42]/30 transition-all text-base font-semibold">
                    Choose files
                  </button>
                </div>
              )}

              {activeTab === "voice" && (
                <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-3xl bg-[#FFF9EE]">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7FC7AF] to-[#FFD166] flex items-center justify-center shadow-lg mb-6">
                    <Mic className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Voice mode</h3>
                  <p className="text-base text-muted-foreground mb-8">Record your perspectives verbally</p>
                  <button className="px-8 py-4 bg-gradient-to-r from-[#7FC7AF] to-[#FFD166] text-white rounded-2xl hover:shadow-lg hover:shadow-[#7FC7AF]/30 transition-all text-base font-semibold">
                    Start recording
                  </button>
                </div>
              )}
            </div>

            {/* Analyze Button */}
            {activeTab === "type" && (
              <div className="mt-10">
                <button
                  onClick={handleAnalyze}
                  disabled={!partnerAText.trim() || !partnerBText.trim() || appState === "loading"}
                  className="w-full px-8 py-5 bg-gradient-to-r from-[#FF8C42] to-[#FF9EC5] text-white rounded-2xl hover:shadow-xl hover:shadow-[#FF8C42]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg font-bold"
                >
                  {appState === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Analyze Conflict
                    </>
                  )}
                </button>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  TransUs will help translate reactions into clearer emotional meaning
                </p>
              </div>
            )}
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 rounded-3xl p-6 border-2 border-red-200 text-red-800 text-sm">
              {error}
            </div>
          )}

          {/* Loading State */}
          {appState === "loading" && (
            <div className="bg-white rounded-3xl p-20 border-2 border-border shadow-xl text-center">
              <div className="flex flex-col items-center gap-8">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center shadow-2xl">
                    <Heart className="w-14 h-14 text-white fill-white animate-pulse" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-4 border-[#F5E6D3] border-t-[#FF8C42] animate-spin"></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">Analyzing your conversation</h3>
                  <p className="text-lg text-muted-foreground">Understanding emotions, intentions, and finding clarity</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FF8C42] animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-3 h-3 rounded-full bg-[#FF9EC5] animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-3 h-3 rounded-full bg-[#7FC7AF] animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Results State */}
          {appState === "results" && (
            <>
              <AnalysisResults
                partnerAText={partnerAText}
                partnerBText={partnerBText}
                analysis={analysis}
              />
              <div className="text-center pt-8">
                <button
                  onClick={handleReset}
                  className="px-8 py-4 bg-white border-2 border-border text-foreground rounded-2xl hover:border-[#FF8C42] hover:shadow-md transition-all text-base font-semibold"
                >
                  Analyze Another Conflict
                </button>
              </div>
            </>
          )}

          {/* Empty State */}
          {appState === "empty" && activeTab === "type" && !partnerAText && !partnerBText && (
            <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl bg-white">
              <div className="max-w-lg mx-auto">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Ready to reflect?</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Start by having each partner describe their perspective on what happened. 
                  The more detail you provide, the better TransUs can help you understand each other.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}