export function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Decorative floating shapes */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-[#FFB8D9]/10 blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-[#C7B9FF]/10 blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-1/4 w-20 h-20 rounded-full bg-[#A8D8FF]/10 blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-1/3 w-32 h-32 rounded-full bg-[#B8F2E6]/10 blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-[#FFD4A3]/10 blur-2xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Small hearts */}
      <div className="absolute top-1/4 right-1/4 text-[#FFB8D9]/20 text-2xl animate-float">❤️</div>
      <div className="absolute bottom-1/3 left-1/3 text-[#C7B9FF]/20 text-xl animate-float" style={{ animationDelay: '1.5s' }}>💜</div>
      <div className="absolute top-2/3 right-1/2 text-[#A8D8FF]/20 text-3xl animate-float" style={{ animationDelay: '2.5s' }}>💙</div>
    </div>
  );
}
