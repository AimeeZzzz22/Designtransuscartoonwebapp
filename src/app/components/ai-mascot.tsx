import { Heart, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AIMascotProps {
  state: "empty" | "loading" | "results";
}

export function AIMascot({ state }: AIMascotProps) {
  const messages = {
    empty: {
      title: "Hi there! 👋",
      text: "I'm here to help you understand each other. Share what happened and I'll help translate emotions into clearer meaning.",
    },
    loading: {
      title: "Analyzing... 💭",
      text: "Let's slow down and reflect together. I'm looking at both perspectives to find the real feelings and intentions.",
    },
    results: {
      title: "Here's what I found 💡",
      text: "I've analyzed both perspectives. Take your time reading through the insights—understanding takes patience.",
    },
  };

  const currentMessage = messages[state];

  return (
    <div className="bg-white rounded-xl p-6 border border-border sticky top-24">
      <div className="flex flex-col items-center text-center">
        {/* Mascot Avatar */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-[#FF9EC5] flex items-center justify-center">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1770049792889-cfc7f46c26aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwbWFzY290JTIwY2hhcmFjdGVyJTIwZnJpZW5kbHl8ZW58MXx8fHwxNzczNTM2NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="AI Assistant"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {state === "loading" && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center border-2 border-border">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9EC5] animate-pulse" />
            </div>
          )}
          {state === "results" && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center border-2 border-border">
              <Heart className="w-3.5 h-3.5 text-[#A8E6CF] fill-[#A8E6CF]" />
            </div>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2.5">
          <h3 className="text-base font-semibold text-foreground">{currentMessage.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{currentMessage.text}</p>
        </div>
      </div>

      {/* Tips based on state */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="space-y-2">
          <p className="text-xs font-medium text-foreground">💡 Tips</p>
          {state === "empty" && (
            <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>• Be honest about your feelings</li>
              <li>• Include specific examples</li>
              <li>• Focus on your perspective</li>
            </ul>
          )}
          {state === "loading" && (
            <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>• Take a deep breath</li>
              <li>• Remember: both views matter</li>
              <li>• Stay open-minded</li>
            </ul>
          )}
          {state === "results" && (
            <ul className="text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              <li>• Read with compassion</li>
              <li>• Consider both perspectives</li>
              <li>• Use insights for dialogue</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
