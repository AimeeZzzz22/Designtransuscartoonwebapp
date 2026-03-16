import { Heart, Sparkles, MessageCircle, Shield, Target, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import conflictImage1 from "figma:asset/cf687a8a0ddbde552bce3678d50d3ab9d72d5fac.png";
import conflictImage2 from "figma:asset/8c7ff9dd3d60a594afb09bd753aeaf55e0f016fe.png";

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-border">
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
          <div className="flex items-center gap-10">
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              How It Works
            </a>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              Features
            </a>
            <a href="#safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              Safety
            </a>
            <Link 
              to="/app" 
              className="px-6 py-3 bg-gradient-to-r from-[#FF8C42] to-[#FF9EC5] text-white rounded-2xl hover:shadow-lg hover:shadow-[#FF8C42]/30 transition-all text-sm font-semibold"
            >
              Try Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-muted-foreground border border-border shadow-sm">
              <Sparkles className="w-4 h-4 text-[#FF8C42]" />
              <span>AI-powered relationship reflection</span>
            </div>
            <h1 className="text-6xl font-bold text-foreground leading-tight">
              Understand what's<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C42] to-[#FF9EC5]">
                really being said
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              TransUs helps couples reflect on arguments by translating emotional reactions into clearer understanding. 
              Discover each other's true feelings, intentions, and misunderstandings.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/app" 
                className="px-8 py-4 bg-gradient-to-r from-[#FF8C42] to-[#FF9EC5] text-white rounded-2xl hover:shadow-lg hover:shadow-[#FF8C42]/30 transition-all flex items-center gap-2 font-semibold text-lg"
              >
                Start Reflecting
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a 
                href="#how-it-works" 
                className="px-8 py-4 bg-white border-2 border-border text-foreground rounded-2xl hover:border-[#FF8C42] hover:shadow-md transition-all flex items-center gap-2 font-semibold text-lg"
              >
                See How It Works
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/10 to-[#FF9EC5]/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white rounded-3xl p-8 border-2 border-border shadow-xl">
              <img 
                src={conflictImage1}
                alt="Couple in conflict"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-24 border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF3E0] rounded-full text-sm text-[#FF8C42] font-semibold mb-6">
              ✨ Simple & Effective
            </div>
            <h2 className="text-5xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Three simple steps to transform conflict into clarity</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <div className="bg-[#FFF9EE] rounded-3xl p-8 border-2 border-border h-full pt-16">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#FF8C42] flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-[#FF8C42]" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Share what happened</h3>
                <p className="text-muted-foreground leading-relaxed">Each partner describes what was said and how they felt during the conversation</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#FF9EC5] to-[#7FC7AF] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <div className="bg-[#FFF9EE] rounded-3xl p-8 border-2 border-border h-full pt-16">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#FF9EC5] flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-[#FF9EC5]" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Analyze emotions</h3>
                <p className="text-muted-foreground leading-relaxed">Our AI analyzes the underlying emotions, intentions, and misunderstandings</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#7FC7AF] to-[#FFD166] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <div className="bg-[#FFF9EE] rounded-3xl p-8 border-2 border-border h-full pt-16">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#7FC7AF] flex items-center justify-center mb-6">
                  <Lightbulb className="w-8 h-8 text-[#7FC7AF]" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Get clarity</h3>
                <p className="text-muted-foreground leading-relaxed">Receive gentle rephrasings and reflection prompts for next steps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Illustration Section */}
      <section className="py-24 bg-gradient-to-br from-[#FFF9EE] to-[#FFF3E0]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                From conflict to connection
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Every disagreement is an opportunity to understand each other better. TransUs helps you see beyond 
                the words to discover the feelings and intentions underneath.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#FF8C42] flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-[#FF8C42]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Emotional clarity</h4>
                    <p className="text-sm text-muted-foreground">Understand what you're both really feeling</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#FF9EC5] flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-[#FF9EC5]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Better communication</h4>
                    <p className="text-sm text-muted-foreground">Learn to express yourselves more clearly</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/20 to-[#FF9EC5]/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-3xl p-6 border-2 border-border shadow-xl">
                <img 
                  src={conflictImage2}
                  alt="Couple resolving conflict"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF3E0] rounded-full text-sm text-[#FF8C42] font-semibold mb-6">
              💫 Powerful Features
            </div>
            <h2 className="text-5xl font-bold text-foreground mb-4">Everything you need</h2>
            <p className="text-xl text-muted-foreground">Tools to help you understand each other better</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Heart className="w-6 h-6" />}
              color="#FF9EC5"
              title="Emotion Detection"
              description="Identify the real feelings behind the words"
            />
            <FeatureCard 
              icon={<Target className="w-6 h-6" />}
              color="#7FC7AF"
              title="Intention Translation"
              description="Understand what each person really meant"
            />
            <FeatureCard 
              icon={<MessageCircle className="w-6 h-6" />}
              color="#FFD166"
              title="Misunderstanding Analysis"
              description="Pinpoint where communication broke down"
            />
            <FeatureCard 
              icon={<Sparkles className="w-6 h-6" />}
              color="#FF8C42"
              title="Calmer Rephrasing"
              description="Get gentler ways to express the same ideas"
            />
            <FeatureCard 
              icon={<Lightbulb className="w-6 h-6" />}
              color="#EF476F"
              title="Reflection Prompts"
              description="Guided questions for deeper understanding"
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6" />}
              color="#7FC7AF"
              title="Safety-Aware Support"
              description="Flags concerning patterns with care"
            />
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section id="safety" className="py-24 bg-gradient-to-br from-[#FFF9EE] to-[#FFF3E0] border-t border-border">
        <div className="max-w-5xl mx-auto px-8">
          <div className="bg-white rounded-3xl p-12 border-2 border-border shadow-xl">
            <div className="flex items-start gap-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7FC7AF] to-[#FFD166] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">Trust & Safety</h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground font-semibold">TransUs is a reflection tool, not therapy.</strong> We're here to help 
                    couples understand each other better after everyday disagreements and miscommunications.
                  </p>
                  <p>
                    Our AI focuses on empathy, communication support, and emotional clarity. We analyze patterns and 
                    provide gentle guidance, but we're not a substitute for professional counseling.
                  </p>
                  <p>
                    If concerning patterns emerge, our safety-aware system will flag them and suggest appropriate 
                    professional resources. Your wellbeing and safety always come first.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="px-5 py-2.5 bg-[#FFF3E0] rounded-full border-2 border-[#F5E6D3]">
                    <span className="text-sm font-semibold text-foreground">✨ Empathy-focused</span>
                  </div>
                  <div className="px-5 py-2.5 bg-[#FFF3E0] rounded-full border-2 border-[#F5E6D3]">
                    <span className="text-sm font-semibold text-foreground">🛡️ Safety-aware</span>
                  </div>
                  <div className="px-5 py-2.5 bg-[#FFF3E0] rounded-full border-2 border-[#F5E6D3]">
                    <span className="text-sm font-semibold text-foreground">💙 Non-judgmental</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white border-t border-border">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="bg-gradient-to-br from-[#FF8C42] to-[#FF9EC5] rounded-3xl p-20 shadow-2xl shadow-[#FF8C42]/20">
            <h2 className="text-5xl font-bold text-white mb-4">Ready to understand<br />each other better?</h2>
            <p className="text-xl text-white/90 mb-10">Start reflecting on your conversations today</p>
            <Link 
              to="/app" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#FF8C42] rounded-2xl hover:shadow-xl transition-all text-lg font-bold"
            >
              Try TransUs Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-white">
        <div className="max-w-7xl mx-auto px-8 text-center text-sm text-muted-foreground">
          <p>© 2026 TransUs. Made with 💙 for better conversations.</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, color, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-border hover:border-[#FF8C42] hover:shadow-lg transition-all group">
      <div 
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg" 
        style={{ backgroundColor: color, color: 'white' }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}