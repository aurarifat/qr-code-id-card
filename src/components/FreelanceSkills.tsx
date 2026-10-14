import React from 'react';
import { Palette, Code2, Shirt, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export const FreelanceSkills: React.FC = () => {
  const skills = [
    {
      name: 'Graphic Design',
      icon: Palette,
      desc: 'Visual branding, vector badges, esports mascots, and social post banners.',
      level: 'Creative Suite',
    },
    {
      name: 'App Development',
      icon: Code2,
      desc: 'Mobile UI concepts, clean responsive layouts, and interactive prototypes.',
      level: 'Frontend & UI',
    },
    {
      name: 'T-shirt Design',
      icon: Shirt,
      desc: 'Custom apparel merchandise, screen-print typography, and streetwear art.',
      level: 'Merchandise',
    },
    {
      name: 'Thumbnail Making',
      icon: ImageIcon,
      desc: 'High-CTR YouTube and TikTok thumbnails with dynamic game lighting and titles.',
      level: 'High-Impact',
    },
  ];

  return (
    <section id="freelance" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="section-header mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#FF6500]" />
            <span className="font-tech text-xs tracking-widest uppercase text-[#FF7A1A] font-semibold">
              CREATIVE WORK
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white dark:text-white light:text-[#121212]">
            Freelancing & Skills
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#858585] max-w-xl font-body">
            Specialized design and digital craft capabilities tailored for content creators and brands.
          </p>
        </div>

        {/* Showcase Container */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#151515]/90 to-[#0D0D0D]/90 dark:from-[#151515]/90 dark:to-[#0D0D0D]/90 light:from-white light:to-orange-50/20 border border-[#FF6500]/30 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div
                  key={idx}
                  className="group relative p-6 rounded-2xl bg-[#121212]/70 dark:bg-[#121212]/70 light:bg-white/80 border border-white/5 dark:border-white/5 light:border-black/5 hover:border-[#FF6500]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(255,101,0,0.15)] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6500]/20 to-[#D94700]/10 border border-[#FF6500]/30 flex items-center justify-center text-[#FF7A1A] mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="inline-block px-2 py-0.5 rounded text-[10px] font-tech text-[#FFB347] bg-[#202020] dark:bg-[#202020] light:bg-slate-100 uppercase tracking-wider mb-2">
                      {skill.level}
                    </div>

                    <h3 className="font-display font-bold text-xl text-white dark:text-white light:text-[#121212] mb-2 group-hover:text-[#FF7A1A] transition-colors">
                      {skill.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#858585] dark:text-[#858585] light:text-[#666] leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#FF7A1A]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="font-tech text-[11px]">Available for Commissions</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
