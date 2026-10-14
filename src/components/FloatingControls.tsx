import React, { useState, useEffect } from 'react';
import { ArrowUp, Instagram, Facebook, Send, Twitter, Globe, MessageSquare, Radio, Youtube } from 'lucide-react';
import { useSiteData, SocialPlatform } from '../context/SiteDataContext';

export const FloatingControls: React.FC = () => {
  const { siteData } = useSiteData();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 320);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'tiktok':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33 6.34 6.34 0 0 0 6.34-6.33V8.87a8.16 8.16 0 0 0 4.91 1.62v-3.8z" />
          </svg>
        );
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'discord':
        return <Radio className="w-4 h-4" />;
      case 'telegram':
        return <Send className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  // Get active accounts from siteData
  const activeSocials = (siteData.socialAccounts || []).filter((acc) => acc.isActive && acc.url);
  // Default to first 3 if none explicitly active
  const displaySocials = activeSocials.length > 0 ? activeSocials.slice(0, 4) : (siteData.socialAccounts || []).slice(0, 3);

  return (
    <>
      {/* Floating Vertical Social Icons (Fixed on right) */}
      <aside
        className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3"
        aria-label="Quick Social Shortcuts"
      >
        {displaySocials.map((s) => (
          <a
            key={s.id || s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-white/95 border border-[#FF6500]/40 hover:border-[#FF6500] text-white dark:text-white light:text-[#121212] hover:text-[#FF7A1A] flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,101,0,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-110"
            aria-label={`Open ${s.title}`}
            title={`Open ${s.title}`}
          >
            {getPlatformIcon(s.platform)}
            {/* Tooltip on desktop */}
            <span className="hidden sm:block absolute right-full mr-3 px-2 py-1 rounded bg-[#0A0A0A] text-[#FFB347] font-tech text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-[#FF6500]/20 shadow-md">
              {s.title}
            </span>
          </a>
        ))}
      </aside>

      {/* Floating Go-To-Top Button (Fixed on bottom right, clear of social buttons) */}
      <div
        className={`fixed bottom-5 right-3 sm:bottom-6 sm:right-5 z-30 transition-all duration-300 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          type="button"
          onClick={scrollToTop}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#121212] dark:bg-[#121212] light:bg-white border border-[#FF6500]/50 hover:border-[#FF6500] text-[#FF7A1A] hover:text-white hover:bg-[#FF6500] shadow-[0_4px_20px_rgba(255,101,0,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF6500] cursor-pointer"
          aria-label="Scroll back to top"
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};
