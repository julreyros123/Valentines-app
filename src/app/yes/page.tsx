"use client";

import { useState, useEffect } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  color: string;
  rotation: number;
}

export default function YesPage() {
  const [mounted, setMounted] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [showMessage, setShowMessage] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Generate confetti
    const colors = ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff", "#5f27cd", "#00d2d3", "#ff9f43"];
    const newConfetti: ConfettiPiece[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
    }));
    setConfetti(newConfetti);

    // Progressive message reveal
    const timer1 = setTimeout(() => setShowMessage(1), 500);
    const timer2 = setTimeout(() => setShowMessage(2), 1500);
    const timer3 = setTimeout(() => setShowMessage(3), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Confetti */}
      {mounted && confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed w-3 h-3 rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-fall 3s ease-out forwards`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      {/* Floating Hearts */}
      {mounted && Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`heart-${i}`}
          className="fixed text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-50px",
            animation: `float-up 4s ease-out forwards`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          {["💕", "💖", "💗", "💓", "💝", "❤️", "🧡", "💛", "💚", "💙", "💜"][i % 11]}
        </div>
      ))}

      {/* Main Content */}
      <div className={`relative z-10 max-w-2xl w-full text-center transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        {/* Success Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 md:p-16 border-4 border-rose-300">
          {/* Big Heart */}
          <div className="mb-6">
            <span className="text-8xl md:text-9xl heart-beat inline-block drop-shadow-lg">💖</span>
          </div>

          {/* YEY Message */}
          {showMessage >= 1 && (
            <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-6 bounce-in">
              YEY!!! 🎉
            </h1>
          )}

          {/* Cute GIF */}
          {showMessage >= 2 && (
            <div className="my-6 bounce-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative w-full max-w-xs mx-auto rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/2f99bf9ccc11d217b1c97dd0592c8c93f411d2b8-521x640.gif"
                  alt="Jett cute gif"
                  className="w-full h-auto"
                />
              </div>
              <p className="text-rose-500 font-medium mt-2">So cute! 💕</p>
            </div>
          )}

          {showMessage >= 3 && (
            <div className="space-y-4 bounce-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-2xl md:text-3xl text-gray-700 font-semibold">
                Fionah, you just made me the happiest person! 💕
              </p>
              <p className="text-xl text-gray-600">
                This Valentine's Day is going to be absolutely perfect! 
              </p>
              <div className="text-6xl py-4">
                🌹💝🌹
              </div>
              <p className="text-lg text-rose-600 font-medium">
                I can't wait to spend this special day with you! 
              </p>
            </div>
          )}
        </div>

        {/* Bottom Message */}
        <p className="text-white/90 mt-8 text-lg font-medium drop-shadow-md">
          💕 Best. Valentine's. Ever! 💕
        </p>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
