import { Heart, Brain, AlertCircle, Wand2, Compass, Shield, Sparkles } from "lucide-react";

interface AnalysisResultsProps {
  partnerAText: string;
  partnerBText: string;
}

export function AnalysisResults({ partnerAText, partnerBText }: AnalysisResultsProps) {
  return (
    <div className="space-y-10">
      {/* Results Header */}
      <div className="bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] rounded-3xl p-12 text-center shadow-2xl shadow-[#FF8C42]/20">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Sparkles className="w-6 h-6 text-white" />
          <h2 className="text-4xl font-bold text-white">Analysis Complete</h2>
        </div>
        <p className="text-xl text-white/90">Here's what I discovered about your conversation</p>
      </div>

      {/* Row 1: Partner Feelings */}
      <div className="grid md:grid-cols-2 gap-6">
        <ResultCard
          icon={<Heart className="w-6 h-6" />}
          color="#FF9EC5"
          title="What Partner A may be feeling"
          badge="Partner A"
          badgeColor="#FF8C42"
        >
          <p className="text-base text-foreground leading-relaxed">
            Partner A seems to be feeling <strong>neglected and unimportant</strong>. The lack of response triggered 
            feelings of being undervalued in the relationship. There's also an underlying <strong>fear of emotional distance</strong> growing between you.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <EmotionTag color="#FF9EC5">Neglected</EmotionTag>
            <EmotionTag color="#FF9EC5">Undervalued</EmotionTag>
            <EmotionTag color="#FF9EC5">Worried</EmotionTag>
          </div>
        </ResultCard>

        <ResultCard
          icon={<Heart className="w-6 h-6" />}
          color="#7FC7AF"
          title="What Partner B may be feeling"
          badge="Partner B"
          badgeColor="#7FC7AF"
        >
          <p className="text-base text-foreground leading-relaxed">
            Partner B appears to be experiencing <strong>overwhelm and stress</strong> from external pressures. 
            They may also feel <strong>guilty</strong> for not being able to respond, combined with a sense of 
            being <strong>misunderstood</strong> about their intentions.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <EmotionTag color="#7FC7AF">Overwhelmed</EmotionTag>
            <EmotionTag color="#7FC7AF">Guilty</EmotionTag>
            <EmotionTag color="#7FC7AF">Stressed</EmotionTag>
          </div>
        </ResultCard>
      </div>

      {/* Row 2: Partner Intentions */}
      <div className="grid md:grid-cols-2 gap-6">
        <ResultCard
          icon={<Brain className="w-6 h-6" />}
          color="#FFD166"
          title="What Partner A may have meant"
          badge="Intent"
          badgeColor="#FFD166"
        >
          <p className="text-base text-foreground leading-relaxed">
            Partner A likely meant to express <strong>a need for reassurance and connection</strong>, not to criticize. 
            The underlying message is: <em>"I miss feeling close to you and I need to know I still matter."</em>
          </p>
          <div className="mt-6 p-5 bg-[#FFF9EE] rounded-2xl border-2 border-[#F5E6D3]">
            <p className="text-sm text-muted-foreground italic">
              💭 "I'm reaching out because our connection is important to me"
            </p>
          </div>
        </ResultCard>

        <ResultCard
          icon={<Brain className="w-6 h-6" />}
          color="#EF476F"
          title="What Partner B may have meant"
          badge="Intent"
          badgeColor="#EF476F"
        >
          <p className="text-base text-foreground leading-relaxed">
            Partner B's intention was likely to <strong>protect their mental space</strong> during a difficult time, 
            not to hurt. The underlying message is: <em>"I care about you but I'm struggling to manage everything right now."</em>
          </p>
          <div className="mt-6 p-5 bg-[#FFF9EE] rounded-2xl border-2 border-[#F5E6D3]">
            <p className="text-sm text-muted-foreground italic">
              💭 "I need space to cope, but it doesn't mean I don't care"
            </p>
          </div>
        </ResultCard>
      </div>

      {/* Row 3: Main Misunderstanding */}
      <ResultCard
        icon={<AlertCircle className="w-6 h-6" />}
        color="#FF8C42"
        title="Main misunderstanding"
        badge="Core Issue"
        badgeColor="#FF8C42"
        wide
      >
        <div className="space-y-6">
          <p className="text-base text-foreground leading-relaxed">
            The core misunderstanding is about <strong>the meaning of silence</strong>. Partner A interpreted the lack of response 
            as lack of care, while Partner B's silence was actually a coping mechanism for stress, not a reflection of their feelings 
            toward Partner A.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#FFF9EE] rounded-2xl border-2 border-[#F5E6D3]">
              <p className="text-sm font-semibold text-foreground mb-3">Partner A thought:</p>
              <p className="text-sm text-muted-foreground italic">"They don't care about me anymore"</p>
            </div>
            <div className="p-6 bg-[#FFF9EE] rounded-2xl border-2 border-[#F5E6D3]">
              <p className="text-sm font-semibold text-foreground mb-3">Partner B meant:</p>
              <p className="text-sm text-muted-foreground italic">"I need time to handle my stress"</p>
            </div>
          </div>
        </div>
      </ResultCard>

      {/* Row 4: Calmer Rephrasings */}
      <div className="bg-white rounded-3xl p-10 border-2 border-border shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7FC7AF] to-[#FFD166] flex items-center justify-center shadow-lg">
            <Wand2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-foreground">Calmer rephrasings</h3>
            <p className="text-base text-muted-foreground">How to express the same ideas more gently</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center shadow-md">
                <span className="text-sm text-white font-bold">A</span>
              </div>
              <p className="text-base font-semibold text-foreground">For Partner A</p>
            </div>
            <div className="bg-[#FFF9EE] p-6 rounded-2xl border-l-4 border-[#FF8C42]">
              <p className="text-base text-foreground leading-relaxed">
                "I've been feeling a bit disconnected lately when I don't hear from you. I know you're busy—could we 
                check in more often so I feel close to you?"
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7FC7AF] to-[#FFD166] flex items-center justify-center shadow-md">
                <span className="text-sm text-white font-bold">B</span>
              </div>
              <p className="text-base font-semibold text-foreground">For Partner B</p>
            </div>
            <div className="bg-[#FFF9EE] p-6 rounded-2xl border-l-4 border-[#7FC7AF]">
              <p className="text-base text-foreground leading-relaxed">
                "I'm going through a lot right now and need some quiet time to process. It's not about you—I really value us. 
                Can we find a balance that works for both of us?"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Next-Step Reflection Prompt */}
      <ResultCard
        icon={<Compass className="w-6 h-6" />}
        color="#FF9EC5"
        title="Next-step reflection prompt"
        badge="Moving Forward"
        badgeColor="#FF9EC5"
        wide
      >
        <div className="space-y-6">
          <p className="text-base text-foreground leading-relaxed">
            Now that you both understand each other's feelings and intentions better, here are some questions to reflect on together:
          </p>
          <div className="space-y-5">
            <ReflectionQuestion number={1}>
              How can Partner A feel more connected without overwhelming Partner B during stressful times?
            </ReflectionQuestion>
            <ReflectionQuestion number={2}>
              How can Partner B communicate their need for space in a way that reassures Partner A?
            </ReflectionQuestion>
            <ReflectionQuestion number={3}>
              What's a signal or routine you could create to stay connected even during busy periods?
            </ReflectionQuestion>
          </div>
          <div className="mt-8 p-6 bg-[#FFF9EE] rounded-2xl border-2 border-[#F5E6D3]">
            <p className="text-base text-foreground">
              💡 <strong>Tip:</strong> Set aside 15 minutes to discuss these questions when you're both calm and ready to listen.
            </p>
          </div>
        </div>
      </ResultCard>

      {/* Row 6: Safety Flag */}
      <ResultCard
        icon={<Shield className="w-6 h-6" />}
        color="#7FC7AF"
        title="Safety check"
        badge="All Clear"
        badgeColor="#7FC7AF"
        wide
      >
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7FC7AF] to-[#FFD166] flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="space-y-4">
            <p className="text-base text-foreground leading-relaxed">
              ✅ No concerning patterns detected in this conversation. This appears to be a common misunderstanding that can be 
              resolved through clearer communication.
            </p>
            <p className="text-sm text-muted-foreground">
              Remember: TransUs is a reflection tool, not therapy. If you're experiencing ongoing communication difficulties, 
              consider speaking with a relationship counselor.
            </p>
          </div>
        </div>
      </ResultCard>
    </div>
  );
}

interface ResultCardProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  badge: string;
  badgeColor: string;
  children: React.ReactNode;
  wide?: boolean;
}

function ResultCard({ icon, color, title, badge, badgeColor, children, wide }: ResultCardProps) {
  return (
    <div 
      className={`bg-white rounded-3xl p-8 border-2 border-border shadow-xl ${
        wide ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: color, color: 'white' }}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        </div>
        <div className="px-4 py-2 text-white rounded-xl text-sm font-semibold shadow-md" style={{ backgroundColor: badgeColor }}>
          {badge}
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

interface EmotionTagProps {
  children: React.ReactNode;
  color: string;
}

function EmotionTag({ children, color }: EmotionTagProps) {
  return (
    <span 
      className="px-4 py-2 text-white rounded-xl text-sm font-semibold shadow-md" 
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
}

interface ReflectionQuestionProps {
  number: number;
  children: React.ReactNode;
}

function ReflectionQuestion({ number, children }: ReflectionQuestionProps) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] flex items-center justify-center text-base text-white font-bold shadow-md">
        {number}
      </div>
      <p className="text-base text-foreground leading-relaxed pt-2">{children}</p>
    </div>
  );
}