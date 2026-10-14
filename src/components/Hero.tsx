import React, { useState } from 'react';
import { MessageSquare, Copy, Check, ShieldCheck, ArrowRight, Gamepad2, Sparkles, ZoomIn } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { ImageLightboxModal } from './ImageLightboxModal';
import { useSiteData } from '../context/SiteDataContext';
import { normalizeImageUrl } from '../utils/imageUrl';
import { getAnimationClass } from '../utils/animationUtils';

export const Hero: React.FC = () => {
  const { siteData } = useSiteData();
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  const freeFireId = siteData.freeFireId || '6111000130';
  const brandName = siteData.brandName || 'Aura RIFAT';
  const brandWords = brandName.trim().split(/\s+/).filter(Boolean);
  const firstNameAnim = siteData.heroFirstNameAnimation || 'solid';
  const lastNameAnim = siteData.heroLastNameAnimation || 'shimmer';
  const animSpeed = siteData.heroAnimationSpeed || 'normal';
  const wordAnims = siteData.heroWordAnimations || {};

  const profileImg = normalizeImageUrl(siteData.profilePhotoUrl) || 'https://i.ibb.co/93yZ0YPT/file-00000000a02c8211b7422677595ebb98-1.jpg';

  const handleCopyId = async () => {
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Typographic Hero Column (Left) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Availability / Category Kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151515] dark:bg-[#151515] light:bg-white border border-[#FF6500]/30 shadow-[0_0_15px_rgba(255,101,0,0.15)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF6500] shadow-[0_0_8px_#FF6500]" />
              <span className="font-tech text-xs tracking-wider uppercase text-[#FFB347] font-semibold">
                {siteData.availabilityBadge || 'GAMER • CREATOR • DESIGNER'}
              </span>
            </div>

            {/* Main Brand Heading */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-white dark:text-white light:text-[#121212]">
              {brandWords.length > 0 ? (
                brandWords.map((word, idx) => {
                  const animKey =
                    wordAnims[idx] || (idx === 0 ? firstNameAnim : lastNameAnim);
                  const animClass = getAnimationClass(animKey, animSpeed);
                  return (
                    <React.Fragment key={idx}>
                      <span className={animClass}>{word}</span>
                      {idx < brandWords.length - 1 && ' '}
                    </React.Fragment>
                  );
                })
              ) : (
                <span className="brand-shimmer">{brandName}</span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-lg sm:text-xl font-display font-medium text-[#FF7A1A] tracking-wide">
              {siteData.heroSubtitle || 'Gamer • Content Creator • Designer'}
            </p>

            {/* Tagline */}
            <p className="mt-2 text-sm sm:text-base text-[#BDBDBD] dark:text-[#BDBDBD] light:text-[#555] font-body max-w-xl">
              <strong className="text-white dark:text-white light:text-black font-semibold">
                {siteData.creatorName || 'Mahi Ahmed'}
              </strong>
              {siteData.academicClass && (
                <>
                  {' '}—{' '}
                  <span className="text-[#FFB347] font-medium">{siteData.academicClass}</span>
                </>
              )}
              {siteData.schoolName && (
                <>
                  , <span className="text-white/80">{siteData.schoolName}</span>
                </>
              )}
              {siteData.location && (
                <span className="text-[#858585]"> • {siteData.location}</span>
              )}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
              {/* Primary CTA: WhatsApp */}
              <a
                href={siteData.whatsappUrl || 'https://wa.me/8801595257722'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6500] via-[#FF7A1A] to-[#D94700] text-black font-display font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(255,101,0,0.4)] hover:shadow-[0_0_35px_rgba(255,101,0,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 fill-black text-black" />
                <span>Contact on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary CTA: Copy Free Fire ID */}
              <button
                type="button"
                onClick={handleCopyId}
                className="group relative inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-[#121212] dark:bg-[#121212] light:bg-white border border-[#FF6500]/40 text-[#FAFAFA] dark:text-[#FAFAFA] light:text-[#121212] font-display font-semibold text-sm hover:border-[#FF6500] hover:bg-[#1a1a1a] dark:hover:bg-[#1a1a1a] light:hover:bg-slate-50 transition-all duration-200 shadow-sm cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in" />
                    <span className="text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#FF7A1A] group-hover:scale-110 transition-transform" />
                    <span>Copy Free Fire ID</span>
                    <span className="font-tech text-xs bg-[#222] dark:bg-[#222] light:bg-slate-100 px-2 py-0.5 rounded text-[#FFB347]">
                      {freeFireId}
                    </span>
                  </>
                )}
                {copyError && (
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[11px] text-red-400 whitespace-nowrap">
                    Could not copy automatically
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Profile Visual Column (Right) */}
          <div className="lg:col-span-5 flex justify-center z-10">
            <div className="relative group cursor-pointer" onClick={() => setShowLightbox(true)} title="Click to view Full HD Profile Photo">
              {/* Outer Radiant Ambient Halo */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#FF6500]/30 via-[#FFB347]/20 to-[#D94700]/30 blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-80" />

              {/* Floating Container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-b from-[#FF7A1A] via-[#FF6500]/40 to-[#D94700] shadow-[0_0_40px_rgba(255,101,0,0.35)] animate-float">
                {/* Inner Ring */}
                <div className="w-full h-full rounded-full p-1.5 bg-[#070707] dark:bg-[#070707] light:bg-[#F8F7F4] flex items-center justify-center overflow-hidden">
                  <img
                    key={profileImg}
                    src={profileImg}
                    alt={`${brandName} (${siteData.creatorName}) - Profile`}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500 shadow-inner"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.hero-fallback-avatar')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'hero-fallback-avatar w-full h-full rounded-full bg-gradient-to-tr from-[#FF6500] to-[#D94700] flex items-center justify-center font-display font-black text-4xl text-black';
                        fallback.innerText = brandName.slice(0, 2).toUpperCase();
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>

                {/* Subtle Interactive Zoom Badge */}
                <div className="absolute bottom-2 right-2 p-2.5 rounded-full bg-[#121212]/90 border border-[#FF6500]/50 text-[#FFB347] shadow-lg group-hover:scale-110 transition-transform">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal for Full HD Portrait */}
      <ImageLightboxModal
        isOpen={showLightbox}
        onClose={() => setShowLightbox(false)}
        imageUrl={profileImg}
        title={`${brandName} (${siteData.creatorName}) — Full HD`}
        subtitle="Official high-resolution creator portrait photography"
        aspectRatio="1:1"
        sourceUrl={profileImg}
      />
    </section>
  );
};
