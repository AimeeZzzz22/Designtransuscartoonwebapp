import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Heart, Loader2, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router";

type Role = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I'm TransUs. Tell me about a recent conflict or tense moment, and I'll help you unpack the feelings and misunderstandings.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail ?? "Something went wrong. Please try again.");
      }

      const data = (await res.json()) as { reply: string };
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      const msg =
        e instanceof Error && e.message
          ? e.message
          : "Unexpected error while talking with TransUs.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center shadow-lg shadow-[#FF8C42]/20">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">TransUs</h1>
              <p className="text-xs text-muted-foreground">Live reflection chat</p>
            </div>
          </Link>
          <Link
            to="/app"
            className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to guided analysis
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4 h-full">
          <div className="bg-white rounded-3xl p-5 border border-border shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center shadow-md flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-foreground">Chat with TransUs</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Share what happened in your own words. You can send multiple messages, and
                TransUs will reflect back feelings, intentions, and gentle next steps.
              </p>
            </div>
          </div>

          <div className="flex-1 min-h-[300px] max-h-[60vh] overflow-y-auto space-y-3 rounded-3xl bg-gradient-to-b from-[#FFF9EE] to-[#FFF3E0] p-4 border border-border">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-[#FF8C42] to-[#FF9EC5] text-white rounded-br-none"
                      : "bg-white text-foreground border border-border rounded-bl-none"
                  }`}
                >
                  {m.role === "assistant" && (
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold">
                      <MessageCircle className="w-3.5 h-3.5 text-[#FF8C42]" />
                      <span>TransUs</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{m.content}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-xs text-muted-foreground border border-border shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-[#FF8C42]" />
                  TransUs is thinking…
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm pt-2 pb-4">
            <div className="flex items-end gap-3">
              <textarea
                className="flex-1 min-h-[60px] max-h-[120px] resize-none rounded-2xl border-2 border-border bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-[#FF8C42] shadow-sm"
                placeholder="Describe what was said, what you felt, or what confused you..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-[#FF8C42] to-[#FF9EC5] shadow-md hover:shadow-lg hover:shadow-[#FF8C42]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Send
                  </>
                )}
              </button>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              TransUs is a reflection tool, not therapy or crisis support. Avoid sharing
              identifying or emergency information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

