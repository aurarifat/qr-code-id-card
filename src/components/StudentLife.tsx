import React, { useState } from 'react';
import { BookOpen, Trophy, Swords, BookMarked, RotateCw } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface StudentCardData {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  backTitle: string;
  backDescription: string;
}

export const StudentLife: React.FC = () => {
  const { siteData } = useSiteData();

  const cards: StudentCardData[] = [
    {
      label: 'Favorite Subject',
      value: siteData.favoriteSubject || 'English',
      icon: BookOpen,
      backTitle: 'Language & Writing',
      backDescription: 'Passion for international communication, creative writing, and learning global languages.',
    },
    {
      label: 'Class Rank',
      value: siteData.classRank || 'Top 6',
      icon: Trophy,
      backTitle: 'Academic Excellence',
      backDescription: `Consistent top performer in ${siteData.academicClass || 'Class 9'} at ${siteData.schoolName || 'Lalore High School'}, balancing studies with esports.`,
    },
    {
      label: 'Hobby',
      value: siteData.studentHobby || 'Tournament Player',
      icon: Swords,
      backTitle: 'Esports Competitions',
      backDescription: `Competing in ${siteData.mainGame || 'Free Fire'} squad tournaments and local grassroots gaming championships.`,
    },
    {
      label: 'Interest',
      value: siteData.studentInterest || 'Reads comics & art',
      icon: BookMarked,
      backTitle: 'Visual Storytelling',
      backDescription: 'Exploring comic lore, manga illustration styles, dynamic superhero panels, and character art.',
    },
  ];

  return (
    <section id="studentlife" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="section-header mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#FF6500]" />
            <span className="font-tech text-xs tracking-widest uppercase text-[#FF7A1A] font-semibold">
              LIFE BEYOND GAMING
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white dark:text-white light:text-[#121212]">
            Student Life
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#858585] max-w-xl font-body">
            {siteData.academicClass} academic achievements, literary passions, and personal interests. Click or hover cards to flip.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <FlippableStudentCard key={idx} card={card} />
          ))}
        </div>

      </div>
    </section>
  );
};

const FlippableStudentCard: React.FC<{ card: StudentCardData }> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const Icon = card.icon;

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className="perspective-1000 h-64 cursor-pointer group"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
      aria-label={`${card.label}: ${card.value}`}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT FACE */}
        <div className="absolute inset-0 backface-hidden rounded-3xl p-6 bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-white/95 border border-white/5 dark:border-white/5 light:border-black/5 hover:border-[#FF6500]/50 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-[#FF6500]/15 border border-[#FF6500]/30 text-[#FF7A1A] flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <RotateCw className="w-4 h-4 text-[#858585] group-hover:text-[#FF7A1A] transition-colors" />
          </div>

          <div>
            <span className="font-tech text-xs tracking-wider uppercase text-[#858585] block mb-1">
              {card.label}
            </span>
            <div className="font-display font-extrabold text-2xl text-white dark:text-white light:text-[#121212]">
              {card.value}
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#858585]">
            Flip for details →
          </div>
        </div>

        {/* BACK FACE */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 bg-gradient-to-br from-[#1C1510] to-[#110D09] dark:from-[#1C1510] dark:to-[#110D09] light:from-orange-50 light:to-amber-50 border border-[#FF6500]/60 shadow-[0_10px_35px_rgba(255,101,0,0.25)] flex flex-col justify-between">
          <div>
            <span className="font-tech text-xs uppercase tracking-wider text-[#FFB347] font-bold block mb-1">
              {card.backTitle}
            </span>
            <p className="text-xs sm:text-sm text-[#E0E0E0] dark:text-[#E0E0E0] light:text-[#333] leading-relaxed mt-2">
              {card.backDescription}
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-[#FF7A1A]">
            ← Tap to flip back
          </div>
        </div>
      </div>
    </div>
  );
};
