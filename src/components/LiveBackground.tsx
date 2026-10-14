import React, { useEffect, useRef } from 'react';

export const LiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;
      color: string;
      pulseSpeed: number;
      pulsePhase: number;
    }

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 24 : 45;

    const colors = [
      'rgba(255, 101, 0, ', // Primary Orange
      'rgba(255, 122, 26, ', // Bright Orange
      'rgba(255, 179, 71, ', // Amber
      'rgba(217, 71, 0, ',  // Deep Orange
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const baseOp = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35 - 0.12, // Slight upward drift
        opacity: baseOp,
        baseOpacity: baseOp,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    // Gentle mouse interaction
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let isDocumentVisible = !document.hidden;
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Render loop
    const render = () => {
      if (!isDocumentVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Render floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulsing opacity
        p.pulsePhase += p.pulseSpeed;
        p.opacity = p.baseOpacity + Math.sin(p.pulsePhase) * 0.15;

        // Slight drift relative to cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let offsetX = 0;
        let offsetY = 0;
        if (dist < 220) {
          const factor = (1 - dist / 220) * 8;
          offsetX = -(dx / dist) * factor;
          offsetY = -(dy / dist) * factor;
        }

        ctx.beginPath();
        ctx.arc(p.x + offsetX, p.y + offsetY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.05, Math.min(0.85, p.opacity))})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#FF6500';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Radial Glow 1 (Top Center) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] md:w-[1000px] h-[550px] bg-gradient-to-b from-[#FF6500]/12 via-[#D94700]/5 to-transparent rounded-full blur-[140px] animate-ambient-glow" />

      {/* Deep Radial Glow 2 (Mid Right) */}
      <div className="absolute top-[35%] -right-[15%] w-[450px] md:w-[650px] h-[450px] md:h-[650px] bg-[#FF7A1A]/8 rounded-full blur-[160px] animate-ambient-glow [animation-delay:4s]" />

      {/* Deep Radial Glow 3 (Lower Left) */}
      <div className="absolute top-[65%] -left-[12%] w-[420px] md:w-[600px] h-[420px] md:h-[600px] bg-[#D94700]/8 rounded-full blur-[150px] animate-ambient-glow [animation-delay:2s]" />

      {/* Particle Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-75" />
    </div>
  );
};
