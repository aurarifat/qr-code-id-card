import React, { useState } from 'react';
import { Gamepad2, Smartphone, Award, Copy, Check, Target, Zap } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { useSiteData } from '../context/SiteDataContext';
import { normalizeImageUrl } from '../utils/imageUrl';

export const GamingProfile: React.FC = () => {
  const { siteData } = useSiteData();
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const freeFireId = siteData.freeFireId || '6111000130';
  const gamingPhoto = normalizeImageUrl(siteData.gamingPhotoUrl) || 'https://iili.io/K8fPhe1.png';

  const handleCopy = async () => {
    const success = await copyToClipboard(freeFireId);
    if (success) {
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2400);
    } else {
      setCopyError(true);
      setTimeout(() => setCopyError(false), 3000);
    }
  };

  return (
    <section id="gaming" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="section-header mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#FF6500]" />
            <span className="font-tech text-xs tracking-widest uppercase text-[#FF7A1A] font-semibold">
              PLAYER IDENTITY
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white dark:text-white light:text-[#121212]">
            Gaming Profile
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#858585] max-w-xl font-body">
            Competitive Free Fire battle stats, hardware loadout, and in-game credentials.
          </p>
        </div>

        {/* Split Layout: Image on Left, Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Profile Image (Left) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm group">
              {/* Restrained Ambient Glow */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#FF6500]/25 via-[#D94700]/20 to-[#FFB347]/15 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-70" />

              {/* Glass Frame */}
              <div className="relative rounded-3xl p-2.5 bg-gradient-to-b from-[#FF7A1A] via-[#FF6500]/30 to-[#151515] shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                <div className="rounded-2xl overflow-hidden bg-[#0A0A0A] aspect-square relative flex items-center justify-center">
                  <img
                    key={gamingPhoto}
                    src={gamingPhoto}
                    alt={`${siteData.brandName} Gaming Profile`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallback = document.createElement('div');
                        fallback.className = 'w-full h-full flex flex-col items-center justify-center bg-[#151515] p-6 text-center';
                        fallback.innerHTML = `<span class="font-display font-black text-2xl text-[#FF7A1A]">${siteData.brandName}</span><span class="text-xs text-[#858585] mt-1">${siteData.mainGame} Profile</span>`;
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating in-image badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-[#0F0F0F]/85 backdrop-blur-md border border-[#FF6500]/30">
                    <div>
                      <span className="text-[10px] font-mono text-[#858585] uppercase block">Gamer Handle</span>
                      <span className="font-display font-bold text-white text-sm">{siteData.brandName}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-[#858585] uppercase block">Present Rank</span>
                      <span className="font-tech text-xs font-bold text-[#FFB347]">LEVEL {siteData.presentLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gaming Details (Right) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Game Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#121212]/80 dark:bg-[#121212]/80 light:bg-white/90 border border-white/5 dark:border-white/5 light:border-black/5 backdrop-blur-md hover:border-[#FF6500]/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#FF6500]/20 text-[#FF7A1A]">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-tech text-xs uppercase tracking-wider text-[#858585]">Primary Discipline</span>
                  <h3 className="font-display font-bold text-xl text-white dark:text-white light:text-[#121212]">
                    {siteData.mainGame}
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#BDBDBD] dark:text-[#BDBDBD] light:text-[#666] mt-2">
                Tactical Battle Royale gameplay, precision sniper loadouts, and competitive esports match experience.
              </p>
            </div>

            {/* Gamer Name & Level Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#121212]/80 dark:bg-[#121212]/80 light:bg-white/90 border border-white/5 dark:border-white/5 light:border-black/5 backdrop-blur-md">
                <div className="flex items-center gap-2.5 text-[#FFB347] mb-2">
                  <Target className="w-4 h-4" />
                  <span className="font-tech text-xs uppercase tracking-wider text-[#858585]">In-Game Name</span>
                </div>
                <div className="font-display font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFB347] to-[#FF6500]">
                  {siteData.brandName}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#121212]/80 dark:bg-[#121212]/80 light:bg-white/90 border border-white/5 dark:border-white/5 light:border-black/5 backdrop-blur-md">
                <div className="flex items-center gap-2.5 text-[#FF7A1A] mb-2">
                  <Award className="w-4 h-4" />
                  <span className="font-tech text-xs uppercase tracking-wider text-[#858585]">Present Level</span>
                </div>
                <div className="font-display font-extrabold text-2xl text-white dark:text-white light:text-black tabular-nums">
                  Level {siteData.presentLevel}
                </div>
              </div>
            </div>

            {/* Device Rig Specs */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#121212]/80 dark:bg-[#121212]/80 light:bg-white/90 border border-white/5 dark:border-white/5 light:border-black/5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-100 text-[#FFB347]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-tech text-xs uppercase tracking-wider text-[#858585]">Hardware & Specs</span>
                  <h4 className="font-display font-semibold text-base text-white dark:text-white light:text-[#121212]">
                    {siteData.deviceSpecs.split('(')[0].trim() || siteData.deviceSpecs}
                  </h4>
                </div>
              </div>
              <p className="text-xs font-mono text-[#858585]">
                {siteData.deviceSpecs}
              </p>
            </div>

            {/* Interactive Free Fire ID Container with Copy */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#171717] via-[#121212] to-[#171717] dark:from-[#171717] dark:via-[#121212] dark:to-[#171717] light:from-white light:via-orange-50/30 light:to-white border border-[#FF6500]/40 shadow-[0_0_25px_rgba(255,101,0,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-tech text-xs uppercase tracking-wider text-[#858585] block mb-1">
                  Official Free Fire ID
                </span>
                <span className="font-tech font-bold text-2xl text-[#FFB347] tracking-wider select-all">
                  {freeFireId}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF6500] to-[#D94700] text-black font-display font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(255,101,0,0.35)] hover:shadow-[0_0_25px_rgba(255,101,0,0.5)] active:scale-95 transition-all duration-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-black animate-in zoom-in" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-black" />
                    <span>Copy ID</span>
                  </>
                )}
              </button>
            </div>
            {copyError && (
              <p className="text-xs text-red-400 font-mono text-right">
                Unable to access clipboard automatically. Please copy manually: 6111000130
              </p>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
