import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ScrollProgressBar: React.FC = () => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const glowHeadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure GSAP ScrollTrigger plugin is registered
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const progressBar = progressBarRef.current;
    if (!progressBar) return;

    // Initialize progress bar at scaleX: 0
    gsap.set(progressBar, {
      scaleX: 0,
      transformOrigin: 'left center',
      force3D: true,
    });

    // Create GSAP ScrollTrigger timeline linked to full document scroll
    const progressTween = gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2, // Ultra smooth scrub motion
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Dynamic glow intensification as user scrolls
          if (glowHeadRef.current) {
            glowHeadRef.current.style.opacity = self.progress > 0.01 ? '1' : '0';
          }
        },
      },
    });

    // Fallback resize refresh for dynamic content
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      progressTween.scrollTrigger?.kill();
      progressTween.kill();
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none overflow-visible"
      role="progressbar"
      aria-label="Page scroll progress"
    >
      {/* Background track */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/20 light:bg-black/5" />

      {/* Main GSAP-driven orange progress bar */}
      <div
        ref={progressBarRef}
        className="relative w-full h-full bg-gradient-to-r from-[#D94700] via-[#FF6500] to-[#FFB347] shadow-[0_0_12px_rgba(255,101,0,0.8)]"
      >
        {/* Leading edge radiant glow point */}
        <div
          ref={glowHeadRef}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-[#FFB347] shadow-[0_0_10px_#FFB347,0_0_18px_#FF6500] transition-opacity duration-200 pointer-events-none"
        />
      </div>
    </div>
  );
};
