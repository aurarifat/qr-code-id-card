import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Progress interval for visual smoothness
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 120);

    // Guaranteed exit timer so preloader never traps the user
    const exitTimer = setTimeout(() => {
      setProgress(100);
      setIsFading(true);
      setTimeout(() => {
        setIsRemoved(true);
        if (onComplete) onComplete();
      }, 550);
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070707] transition-opacity duration-500 ease-out ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[500px] h-[340px] md:h-[500px] bg-[#FF6500]/15 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Animated Orbit and Rings */}
        <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
          {/* Outer orange rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#FF6500] border-r-[#FF7A1A]/60 animate-spin [animation-duration:1.6s]" />

          {/* Thin amber counter-rotating orbit */}
          <div className="absolute inset-2 rounded-full border border-dashed border-[#FFB347]/40 animate-spin [animation-duration:3s] [animation-direction:reverse]" />

          {/* Inner core pulse */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D94700] to-[#FF7A1A] p-[2px] shadow-[0_0_25px_rgba(255,101,0,0.5)]">
            <div className="w-full h-full rounded-full bg-[#070707] flex items-center justify-center">
              <span className="font-display font-bold text-sm tracking-wider text-[#FF7A1A]">
                AR
              </span>
            </div>
          </div>

          {/* Orbiting particle */}
          <div className="absolute inset-0 animate-spin [animation-duration:2.2s]">
            <div className="w-2 h-2 rounded-full bg-[#FFB347] shadow-[0_0_8px_#FFB347] -top-1 left-1/2 -translate-x-1/2" />
          </div>
        </div>

        {/* Wordmark */}
        <div className="text-center">
          <h1 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight brand-shimmer">
            Aura RIFAT
          </h1>
          <p className="mt-2 text-xs md:text-sm font-tech text-[#858585] tracking-widest uppercase">
            Preparing Your Experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-[2px] bg-[#1a1a1a] rounded-full mt-6 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#D94700] via-[#FF6500] to-[#FFB347] transition-all duration-200 ease-out rounded-full shadow-[0_0_10px_#FF6500]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
