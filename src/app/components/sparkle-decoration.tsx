import { Sparkles } from "lucide-react";

export function SparkleDecoration() {
  return (
    <>
      <Sparkles className="absolute top-2 right-2 w-4 h-4 text-[#FFB8D9]/30" />
      <Sparkles className="absolute bottom-2 left-2 w-3 h-3 text-[#C7B9FF]/30" />
    </>
  );
}
