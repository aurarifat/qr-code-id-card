import React, { useState } from 'react';
import { Crosshair, Shield } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { normalizeImageUrl } from '../utils/imageUrl';

interface WeaponItem {
  name: string;
  category: string;
  imageUrl: string;
  role: string;
}

export const FavoriteWeapons: React.FC = () => {
  const { siteData } = useSiteData();

  const weapons: WeaponItem[] = [
    {
      name: 'Woodpecker',
      category: 'Marksman Rifle',
      imageUrl: normalizeImageUrl(siteData.weaponWoodpeckerUrl) || 'https://iili.io/K8froWx.jpg',
      role: 'Long-range precision with high armor penetration',
    },
    {
      name: 'M590',
      category: 'Shotgun',
      imageUrl: normalizeImageUrl(siteData.weaponM590Url) || 'https://iili.io/K8frxiQ.jpg',
      role: 'Devastating close-quarters burst damage',
    },
    {
      name: 'AC80',
      category: 'Marksman Rifle',
      imageUrl: normalizeImageUrl(siteData.weaponAC80Url) || 'https://iili.io/K8f6jVf.jpg',
      role: 'Continuous two-shot critical impact damage',
    },
    {
      name: 'Trogon',
      category: 'Shotgun / Launcher',
      imageUrl: normalizeImageUrl(siteData.weaponTrogonUrl) || 'https://iili.io/K8f61SI.jpg',
      role: 'Hybrid switch firing mode for area suppression',
    },
  ];

  return (
    <section id="weapons" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="section-header mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#FF6500]" />
            <span className="font-tech text-xs tracking-widest uppercase text-[#FF7A1A] font-semibold">
              FREE FIRE LOADOUT
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white dark:text-white light:text-[#121212]">
            Favorite Weapons
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#858585] max-w-xl font-body">
            Signature tactical armory chosen for high rate-of-fire, armor penetration, and clutch battles.
          </p>
        </div>

        {/* Weapons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weapons.map((weapon, idx) => (
            <WeaponCard key={weapon.name} weapon={weapon} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

const WeaponCard: React.FC<{ weapon: WeaponItem; index: number }> = ({ weapon }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="group relative rounded-3xl p-6 bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-white/95 border border-white/5 dark:border-white/5 light:border-black/5 hover:border-[#FF6500]/60 transition-colors backdrop-blur-xl shadow-lg flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="font-tech text-xs tracking-wider uppercase text-[#FF7A1A] font-bold">
            {weapon.category}
          </span>
          <Crosshair className="w-4 h-4 text-[#858585] group-hover:text-[#FF7A1A] transition-colors" />
        </div>

        {/* Weapon Image Preview with fallback */}
        <div className="relative w-full h-36 rounded-2xl bg-black/60 overflow-hidden mb-5 border border-white/5 group-hover:border-[#FF6500]/30 transition-colors flex items-center justify-center p-2">
          <img
            src={weapon.imageUrl}
            alt={weapon.name}
            loading="lazy"
            className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_5px_15px_rgba(255,101,0,0.2)]"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = 'https://iili.io/K8fPhe1.png';
            }}
          />
        </div>

        <h3 className="font-display font-extrabold text-2xl text-white dark:text-white light:text-[#121212] mb-1">
          {weapon.name}
        </h3>
        <p className="text-xs text-[#858585] font-body leading-relaxed">
          {weapon.role}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#858585]">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <Shield className="w-3.5 h-3.5" />
          <span>Active In Loadout</span>
        </div>
      </div>
    </div>
  );
};
