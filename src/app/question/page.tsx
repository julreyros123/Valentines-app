"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function QuestionPage() {
  const router = useRouter();
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [hoverCount, setHoverCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNoHover = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const buttonWidth = 100;
    const buttonHeight = 50;
    
    // Calculate random position within container bounds
    const maxX = rect.width - buttonWidth - 40;
    const maxY = rect.height - buttonHeight - 40;
    
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    
    setNoPosition({ x: newX, y: newY });
    setHoverCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    router.push("/yes");
  };

  const getNoButtonText = () => {
    const texts = [
      "No",
      "Are you sure?",
      "Really?",
      "Think again!",
      "Pretty please?",
      "Don't be shy!",
      "Last chance!",
      "Pretty please?",
      "You know you want to!",
      "I'm waiting...",
      "Say yes!",
      "Please?",
    ];
    return texts[Math.min(hoverCount, texts.length - 1)];
  };

  const hearts = ["💕", "💖", "💗", "💓", "💝", "❤️", "🧡", "💛"];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Floating Decorative Hearts */}
      {mounted && Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="floating-heart absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 20 + 20}px`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.3,
          }}
        >
          {hearts[i % hearts.length]}
        </div>
      ))}

      {/* Main Card */}
      <div className={`relative z-10 max-w-lg w-full transition-all duration-700 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        {/* Card Container */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-white/50">
          {/* Heart Icon */}
          <div className="mb-6">
            <span className="text-6xl heart-beat inline-block">💌</span>
          </div>

          {/* Question */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Will You Be My
          </h1>
          <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-8">
            Valentine? 💖
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8 text-lg">
            I couldn't imagine spending this special day with anyone else but you...
          </p>

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[120px]">
            {/* Yes Button */}
            <button
              onClick={handleYesClick}
              className="px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 pulse-glow"
            >
              YES! 💕
            </button>

            {/* No Button - Moves on hover */}
            <button
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
              style={{
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: hoverCount > 0 ? "transform 0.3s ease-out" : "none",
              }}
              className="px-8 py-3 bg-gray-200 text-gray-600 font-semibold text-lg rounded-full shadow-md hover:bg-gray-300 cursor-pointer select-none"
            >
              {getNoButtonText()} 😢
            </button>
          </div>

          {/* Fun Messages */}
          {hoverCount > 0 && (
            <p className="mt-6 text-rose-500 font-medium animate-pulse">
              {hoverCount === 1 && "Hey! That button is slippery! 🏃‍♂️"}
              {hoverCount === 2 && "Catch me if you can! 😏"}
              {hoverCount === 3 && "I'm too fast for you! ⚡"}
              {hoverCount === 4 && "Just click YES already! 💝"}
              {hoverCount >= 5 && "The YES button is waiting for you... 😉"}
            </p>
          )}
        </div>

        {/* Bottom Message */}
        <p className="text-center text-white/80 mt-6 text-sm">
          P.S. The Yes button doesn't run away! 😉
        </p>
      </div>
    </div>
  );
}
