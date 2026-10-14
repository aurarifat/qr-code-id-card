import React from 'react';
import {
  ExternalLink,
  Eye,
  MessageSquare,
  Youtube,
  Instagram,
  Facebook,
  Share2,
  Globe,
  Radio,
  Send,
  Twitter,
  Github,
} from 'lucide-react';
import { useSiteData, SocialAccount, SocialPlatform } from '../context/SiteDataContext';

export const SocialMedia: React.FC = () => {
  const { siteData } = useSiteData();

  const activeAccounts = siteData.socialAccounts?.filter((acc) => acc.isActive) || [];
  const displayAccounts = activeAccounts.length > 0 ? activeAccounts : siteData.socialAccounts || [];

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'tiktok':
        return (
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33 6.34 6.34 0 0 0 6.34-6.33V8.87a8.16 8.16 0 0 0 4.91 1.62v-3.8z" />
          </svg>
        );
      case 'instagram':
        return (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-xl p-1.5">
            <Instagram className="w-5 h-5 text-white" />
          </div>
        );
      case 'facebook':
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#1877F2] rounded-xl p-1.5">
            <Facebook className="w-5 h-5 text-white" />
          </div>
        );
      case 'youtube':
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#FF0000] rounded-xl p-1.5">
            <Youtube className="w-5 h-5 text-white" />
          </div>
        );
      case 'whatsapp':
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#25D366] rounded-xl p-1.5">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
        );
      case 'discord':
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#5865F2] rounded-xl p-1.5">
            <Radio className="w-5 h-5 text-white" />
          </div>
        );
      case 'telegram':
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#229ED9] rounded-xl p-1.5">
            <Send className="w-5 h-5 text-white" />
          </div>
        );
      case 'twitter':
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#1DA1F2] rounded-xl p-1.5">
            <Twitter className="w-5 h-5 text-white" />
          </div>
        );
      case 'github':
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#24292e] rounded-xl p-1.5">
            <Github className="w-5 h-5 text-white" />
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-[#FF6500] rounded-xl p-1.5">
            <Globe className="w-5 h-5 text-black" />
          </div>
        );
    }
  };

  const getPlatformBorderClass = (platform: SocialPlatform) => {
    switch (platform) {
      case 'tiktok':
        return 'border-[#FF6500]/40 hover:border-[#FF6500]';
      case 'instagram':
        return 'border-pink-500/30 hover:border-pink-500';
      case 'facebook':
        return 'border-blue-500/30 hover:border-blue-500';
      case 'youtube':
        return 'border-red-500/30 hover:border-red-500';
      case 'whatsapp':
        return 'border-emerald-500/30 hover:border-emerald-500';
      case 'discord':
        return 'border-indigo-500/30 hover:border-indigo-500';
      default:
        return 'border-white/10 hover:border-[#FF6500]';
    }
  };

  return (
    <section id="social" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="section-header mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#FF6500]" />
            <span className="font-tech text-xs tracking-widest uppercase text-[#FF7A1A] font-semibold">
              FIND ME ONLINE
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white dark:text-white light:text-[#121212]">
            Connect With Me
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#858585] max-w-xl font-body">
            Follow along on official social channels for Free Fire gameplay clips, lifestyle moments, and design drops.
          </p>
        </div>

        {/* Dynamic Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAccounts.map((account) => {
            const isTikTok = account.platform === 'tiktok';

            return (
              <a
                key={account.id}
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative rounded-3xl p-7 bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-white/95 border ${getPlatformBorderClass(
                  account.platform
                )} backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_45px_rgba(255,101,0,0.2)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div>
                  {/* Header: Platform Icon + External Link */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-black/80 flex items-center justify-center border border-white/10 group-hover:border-[#FF6500]/50 transition-colors shadow-inner overflow-hidden">
                      {getPlatformIcon(account.platform)}
                    </div>
                    <div className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 text-[#858585] group-hover:text-[#FF7A1A] transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Username */}
                  <div>
                    <span className="font-tech text-xs tracking-wider uppercase text-[#858585] block mb-1">
                      {account.title}
                    </span>
                    <h3 className="font-display font-extrabold text-2xl text-white dark:text-white light:text-[#121212]">
                      {siteData.brandName}
                    </h3>
                    <p className="font-tech text-sm text-[#FF7A1A] mt-1 font-semibold truncate">
                      {account.username}
                    </p>
                  </div>

                  {/* Metric / Highlight Box */}
                  <div className="mt-8 p-4 rounded-2xl bg-[#171717] dark:bg-[#171717] light:bg-orange-50/50 border border-white/5 group-hover:border-[#FF6500]/20 transition-colors">
                    {account.badge && (
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#858585] mb-1">
                        {isTikTok ? (
                          <Eye className="w-3.5 h-3.5 text-[#FFB347]" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5 text-[#FFB347]" />
                        )}
                        <span>{account.badge}</span>
                      </div>
                    )}
                    {isTikTok ? (
                      <div className="font-display font-black text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFB347] to-[#FF6500] tabular-nums tracking-tight">
                        {siteData.tiktokViralViews} Views
                      </div>
                    ) : (
                      <p className="text-xs text-[#BDBDBD] dark:text-[#BDBDBD] light:text-[#555] leading-relaxed">
                        {account.description || 'Follow and stay tuned for regular channel updates.'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#858585] group-hover:text-[#FAFAFA] transition-colors">
                  <span>Open {account.title.replace(' Platform', '').replace(' Network', '')}</span>
                  <span className="text-[#FF7A1A] font-semibold group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
