import React from 'react';
import { Lock } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { siteData } = useSiteData();
  const currentYear = new Date().getFullYear();

  const brandName = siteData.brandName || 'Aura RIFAT';
  const brandWords = brandName.trim().split(/\s+/);
  const firstWord = brandWords[0] || 'Aura';
  const restWords = brandWords.slice(1).join(' ');

  return (
    <footer className="relative border-t border-[#FF6500]/20 bg-[#0A0A0A] dark:bg-[#0A0A0A] light:bg-[#EFECE6] py-12 overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[#FF6500]/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF6500] shadow-[0_0_8px_#FF6500]" />
              <h3 className="font-display font-extrabold text-xl tracking-tight text-white dark:text-white light:text-[#121212]">
                {firstWord} {restWords && <span className="text-[#FF6500]">{restWords}</span>}
              </h3>
            </div>
            <p className="text-xs text-[#858585] font-body">
              {siteData.heroSubtitle || 'Gamer • Content Creator • Designer'} •{' '}
              <span className="text-[#FF7A1A] font-semibold">{siteData.academicClass || 'Class 9'}</span>
              {siteData.schoolName && (
                <span className="text-[#BDBDBD]"> ({siteData.schoolName})</span>
              )}
            </p>
          </div>

          {/* Quick Internal Nav Links */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs font-tech text-[#858585]">
            <a href="#info" className="hover:text-[#FF7A1A] transition-colors">
              Info
            </a>
            <a href="#gaming" className="hover:text-[#FF7A1A] transition-colors">
              Gaming
            </a>
            <a href="#weapons" className="hover:text-[#FF7A1A] transition-colors">
              Weapons
            </a>
            <a href="#gallery" className="hover:text-[#FF7A1A] transition-colors">
              Gallery
            </a>
            <a href="#social" className="hover:text-[#FF7A1A] transition-colors">
              Social
            </a>
            <a href="#school" className="hover:text-[#FF7A1A] transition-colors">
              School
            </a>
            <a href="#contact" className="hover:text-[#FF7A1A] transition-colors">
              Contact
            </a>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 hover:text-[#FF7A1A] transition-colors focus:outline-none cursor-pointer"
                title="Admin Control Portal"
              >
                <Lock className="w-3 h-3 text-[#FF7A1A]" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Dynamic Copyright */}
          <div className="text-xs font-mono text-[#858585]">
            © {currentYear} {brandName} ({siteData.creatorName}). All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};
