import React, { useState } from 'react';
import { School, AlertTriangle, Phone, MessageSquare, MapPin, Hash, ExternalLink, Maximize2 } from 'lucide-react';
import { ImageLightboxModal } from './ImageLightboxModal';
import { useSiteData } from '../context/SiteDataContext';
import { normalizeImageUrl } from '../utils/imageUrl';

export const SchoolInfo: React.FC = () => {
  const { siteData } = useSiteData();
  const [showLightbox, setShowLightbox] = useState(false);

  const schoolLogo = normalizeImageUrl(siteData.schoolLogoUrl) || 'https://iili.io/nVDIIYN.th.jpg';
  const schoolPhoto = normalizeImageUrl(siteData.schoolPhotoUrl) || 'https://i.ibb.co/L2zK7s5/file-0000000059c48211974701cfc407a37a.png';

  return (
    <section id="school" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="section-header mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#FF6500]" />
            <span className="font-tech text-xs tracking-widest uppercase text-[#FF7A1A] font-semibold">
              ACADEMIC INSTITUTION
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white dark:text-white light:text-[#121212]">
            School Information
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#858585] max-w-xl font-body">
            Official secondary education institution details, campus photography, and student ID contact notice.
          </p>
        </div>

        {/* Important Lost ID Card Notice Banner */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#201108] via-[#170E08] to-[#120B06] dark:from-[#201108] dark:via-[#170E08] dark:to-[#120B06] light:from-amber-50 light:via-orange-50 light:to-amber-50 border border-[#FF6500]/50 shadow-[0_0_30px_rgba(255,101,0,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#FF6500]/20 text-[#FF7A1A] shrink-0 mt-0.5">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-tech text-xs uppercase tracking-wider text-[#FFB347] font-bold block mb-1">
                Student ID Card Notice
              </span>
              <p className="font-display font-semibold text-base sm:text-lg text-white dark:text-white light:text-[#121212]">
                If my ID card gets lost, please contact me at my number via the contact option.
              </p>
              <p className="text-xs text-[#858585] mt-1">
                Student: <strong className="text-white">{siteData.creatorName}</strong> • {siteData.academicClass} • {siteData.schoolName}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href={`tel:${siteData.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F1F1F] dark:bg-[#1F1F1F] light:bg-white text-white dark:text-white light:text-black font-tech text-xs font-bold border border-white/10 hover:border-[#FF6500] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF7A1A]" />
              <span>Call: {siteData.phone}</span>
            </a>
            <a
              href={siteData.whatsappUrl || 'https://wa.me/8801595257722'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6500] to-[#D94700] text-black font-display text-xs font-bold shadow-md hover:scale-[1.02] transition-transform"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-black" />
              <span>WhatsApp Me</span>
            </a>
          </div>
        </div>

        {/* Institution Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* School Photo 16:9 Container (Left 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl p-3 bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-white/95 border border-[#FF6500]/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
            <div
              className="relative rounded-2xl overflow-hidden aspect-video bg-[#0A0A0A] group cursor-pointer"
              onClick={() => setShowLightbox(true)}
              title="Click to expand campus photo in Full HD"
            >
              <img
                key={schoolPhoto}
                src={schoolPhoto}
                alt={`${siteData.schoolName} Campus`}
                referrerPolicy="no-referrer"
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.campus-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'campus-fallback w-full h-full flex flex-col items-center justify-center p-6 bg-[#181818] text-center';
                    fallback.innerHTML = `<span class="font-display font-bold text-xl text-[#FF7A1A]">${siteData.schoolName}</span><span class="text-xs text-[#858585] mt-1">Campus View</span>`;
                    parent.appendChild(fallback);
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="font-tech text-xs text-[#FFB347] uppercase tracking-wider block">Campus Photography</span>
                  <span className="font-display font-bold text-base">{siteData.schoolName} Building</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLightbox(true);
                    }}
                    className="font-tech text-xs px-2.5 py-1 rounded bg-black/70 hover:bg-[#FF6500] hover:text-black transition-colors backdrop-blur-md border border-white/10 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Expand FHD</span>
                  </button>
                  <a
                    href={schoolPhoto}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-tech text-xs p-1.5 rounded bg-black/70 hover:bg-[#FF6500] hover:text-black transition-colors backdrop-blur-md border border-white/10"
                    title="View source"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* School Description */}
            <div className="p-4 sm:p-5">
              <p className="text-sm sm:text-base text-[#BDBDBD] dark:text-[#BDBDBD] light:text-[#4A4A4A] leading-relaxed font-body">
                {siteData.schoolDescription}
              </p>
            </div>
          </div>

          {/* School Details & Logo Card (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 rounded-3xl p-6 sm:p-8 bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-white/95 border border-[#FF6500]/30 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            
            {/* Logo + Name */}
            <div className="flex items-center gap-5 pb-6 border-b border-white/10 dark:border-white/10 light:border-black/10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl p-1 bg-gradient-to-tr from-[#FF7A1A] to-[#D94700] shrink-0 shadow-[0_0_20px_rgba(255,101,0,0.35)] group">
                <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden p-1 shadow-inner">
                  <img
                    key={schoolLogo}
                    src={schoolLogo}
                    alt={`${siteData.schoolName} Logo`}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 select-none"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      filter: 'none',
                    }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.logo-fallback')) {
                        const fallback = document.createElement('span');
                        fallback.className = 'logo-fallback font-display font-black text-xs text-[#FF6500]';
                        fallback.innerText = siteData.schoolName.slice(0, 3).toUpperCase();
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
              </div>

              <div>
                <span className="font-tech text-xs tracking-wider uppercase text-[#858585] block mb-0.5">
                  Official Institution
                </span>
                <h3 className="font-display font-extrabold text-2xl text-white dark:text-white light:text-[#121212]">
                  {siteData.schoolName}
                </h3>
                <span className="inline-block mt-1 text-xs font-semibold text-[#FF7A1A]">
                  Secondary Education
                </span>
              </div>
            </div>

            {/* Institution Metadata List */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5">
                <Hash className="w-5 h-5 text-[#FFB347] shrink-0 mt-0.5" />
                <div>
                  <span className="font-tech text-xs uppercase text-[#858585] block">EIIN Number</span>
                  <span className="font-tech font-bold text-lg text-white dark:text-white light:text-black">
                    {siteData.eiinNumber}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5">
                <MapPin className="w-5 h-5 text-[#FF7A1A] shrink-0 mt-0.5" />
                <div>
                  <span className="font-tech text-xs uppercase text-[#858585] block">Geographic Location</span>
                  <span className="font-display font-semibold text-sm text-white dark:text-white light:text-black">
                    {siteData.schoolLocation || siteData.location}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-50 border border-white/5">
                <School className="w-5 h-5 text-[#FFB347] shrink-0 mt-0.5" />
                <div>
                  <span className="font-tech text-xs uppercase text-[#858585] block">Enrolled Level</span>
                  <span className="font-display font-bold text-base text-[#FF7A1A]">
                    {siteData.academicClass} Student
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom note */}
            <div className="pt-2 text-xs font-mono text-[#858585] flex items-center justify-between">
              <span>Verified Institution Info</span>
              <span className="text-[#FFB347]">Rajshahi Board</span>
            </div>

          </div>

        </div>

        {/* Full HD Campus Photo Lightbox Modal */}
        <ImageLightboxModal
          isOpen={showLightbox}
          onClose={() => setShowLightbox(false)}
          imageUrl={schoolPhoto}
          title={`${siteData.schoolName} Campus — Full HD`}
          subtitle={`${siteData.schoolLocation || siteData.location} • Full HD`}
          aspectRatio="16:9"
          sourceUrl={schoolPhoto}
        />

      </div>
    </section>
  );
};
