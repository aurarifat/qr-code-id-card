import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, Copy, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { copyToClipboard } from '../utils/clipboard';
import { useSiteData } from '../context/SiteDataContext';

export const ContactSection: React.FC = () => {
  const { siteData } = useSiteData();
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2200);
    }
  };

  const contacts = [
    {
      type: 'phone',
      label: 'Direct Mobile',
      value: siteData.phone,
      href: `tel:${siteData.phone}`,
      ctaText: 'Call Directly',
      icon: Phone,
      description: 'Available for gaming collaborations, commissions, or emergency school ID contact.',
    },
    {
      type: 'whatsapp',
      label: 'WhatsApp Messenger',
      value: siteData.phone.startsWith('0') ? `+880 ${siteData.phone.slice(1)}` : siteData.phone,
      rawCopy: siteData.phone,
      href: siteData.whatsappUrl,
      ctaText: 'Chat on WhatsApp',
      icon: MessageSquare,
      description: 'Instant response for freelance design projects, squad invites, and inquiries.',
      isPrimary: true,
    },
    {
      type: 'email',
      label: 'Email Dispatch',
      value: siteData.email,
      href: `mailto:${siteData.email}`,
      ctaText: 'Send Email',
      icon: Mail,
      description: 'Formal business communications, sponsorship proposals, and feedback.',
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="section-header mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#FF6500]" />
            <span className="font-tech text-xs tracking-widest uppercase text-[#FF7A1A] font-semibold">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white dark:text-white light:text-[#121212]">
            Let's Connect
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#858585] max-w-xl font-body">
            Direct channels to reach {siteData.brandName || siteData.creatorName} for gameplay collaborations, commissions, and messages.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map((c) => {
            const Icon = c.icon;
            const isCopied = copiedType === c.type;

            return (
              <div
                key={c.type}
                className={`group relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  c.isPrimary
                    ? 'bg-gradient-to-b from-[#1C1510] to-[#110D09] dark:from-[#1C1510] dark:to-[#110D09] light:from-white light:to-orange-50/40 border border-[#FF6500]/60 shadow-[0_10px_35px_rgba(255,101,0,0.2)]'
                    : 'bg-[#121212]/90 dark:bg-[#121212]/90 light:bg-white/95 border border-white/5 dark:border-white/5 light:border-black/5 hover:border-[#FF6500]/40 shadow-md'
                } backdrop-blur-xl`}
              >
                <div>
                  {/* Top Bar: Icon + Action Pill */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF6500]/15 border border-[#FF6500]/30 text-[#FF7A1A] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(c.rawCopy || c.value, c.type)}
                      className="p-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 text-[#858585] hover:text-[#FF7A1A] hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-mono"
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Category & Value */}
                  <span className="font-tech text-xs tracking-wider uppercase text-[#858585] block mb-1">
                    {c.label}
                  </span>
                  <div className="font-display font-extrabold text-xl text-white dark:text-white light:text-[#121212] mb-2 break-all">
                    {c.value}
                  </div>
                  <p className="text-xs text-[#858585] dark:text-[#858585] light:text-[#666] leading-relaxed">
                    {c.description}
                  </p>
                </div>

                {/* Primary CTA Link */}
                <div className="mt-8 pt-5 border-t border-white/5">
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-display font-bold text-xs tracking-wide transition-all ${
                      c.isPrimary
                        ? 'bg-gradient-to-r from-[#FF6500] to-[#D94700] text-black shadow-[0_0_20px_rgba(255,101,0,0.3)] hover:scale-[1.02]'
                        : 'bg-[#181818] dark:bg-[#181818] light:bg-slate-100 text-white dark:text-white light:text-black border border-white/10 hover:border-[#FF6500] hover:text-[#FF7A1A]'
                    }`}
                  >
                    <span>{c.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
