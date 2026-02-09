"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function FloatingHeart({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <div
      className="floating-heart text-white/20"
      style={{
        left,
        top: `${Math.random() * 80 + 10}%`,
        fontSize: `${size}px`,
        animationDelay: `${delay}s`,
      }}
    >
      💕
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenCard = () => {
    router.push("/question");
  };

  const hearts = [
    { delay: 0, left: "5%", size: 30 },
    { delay: 1, left: "15%", size: 25 },
    { delay: 2, left: "85%", size: 35 },
    { delay: 0.5, left: "92%", size: 28 },
    { delay: 1.5, left: "25%", size: 22 },
    { delay: 2.5, left: "75%", size: 32 },
    { delay: 3, left: "10%", size: 26 },
    { delay: 0.8, left: "90%", size: 24 },
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating Hearts Background */}
      {mounted && hearts.map((heart, i) => (
        <FloatingHeart key={i} {...heart} />
      ))}

      {/* Main Content */}
      <main className="relative z-10 text-center px-4">
        <div className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Envelope Container */}
          <div className="relative group cursor-pointer" onClick={handleOpenCard}>
            {/* Envelope Back */}
            <div className="w-80 h-56 bg-gradient-to-br from-rose-300 to-pink-400 rounded-lg shadow-2xl transform transition-transform duration-300 group-hover:scale-105 relative overflow-hidden">
              {/* Envelope Flap */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-rose-400 to-rose-300 transform origin-top transition-transform duration-500 group-hover:rotate-x-12"
                style={{
                  clipPath: "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)",
                }}
              />
              {/* Heart Seal */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="heart-beat text-4xl drop-shadow-lg">❤️</div>
              </div>
              {/* Click Hint */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-sm font-medium">
                Click to open 💌
              </div>
            </div>
          </div>

          {/* Message Below Envelope */}
          <div className="mt-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              A Special Message
            </h1>
            <p className="text-lg text-white/90 max-w-md mx-auto drop-shadow-md">
              Someone special has sent you a Valentine's surprise...
              <br />
              <span className="text-rose-200 font-semibold">Open the envelope to find out!</span>
            </p>
          </div>

          {/* Alternative Button */}
          <button
            onClick={handleOpenCard}
            className="mt-8 px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full text-white font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 pulse-glow"
          >
            💝 Open My Valentine
          </button>
        </div>
      </main>

      {/* Bottom Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 opacity-30">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#ffffff"/>
        </svg>
      </div>
    </div>
  );
}
