import React from 'react';
import { User, Gamepad, Calendar, GraduationCap, School, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export const PersonalInfo: React.FC = () => {
  const { siteData } = useSiteData();

  const infoCards = [
    {
      icon: User,
      label: 'Full Name',
      value: siteData.creatorName,
      highlight: false,
    },
    {
      icon: Gamepad,
      label: 'Gamer Tag',
      value: siteData.brandName,
      highlight: true,
      customClass: 'font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFB347] to-[#FF6500]',
    },
    {
      icon: Calendar,
      label: 'Age',
      value: siteData.age,
      highlight: false,
    },
    {
      icon: GraduationCap,
      label: 'Current Academic Class',
      value: siteData.academicClass,
      highlight: true,
      customClass: 'font-display font-extrabold text-[#FF7A1A]',
    },
    {
      icon: School,
      label: 'Institution',
      value: siteData.schoolName,
      highlight: false,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: siteData.location,
      highlight: false,
    },
    {
      icon: Mail,
      label: 'Email Address',
      value: siteData.email,
      highlight: false,
      href: `mailto:${siteData.email}`,
    },
    {
      icon: Phone,
      label: 'Phone Contact',
      value: siteData.phone,
      highlight: false,
      href: `tel:${siteData.phone}`,
    },
  ];

  return (
    <section id="info" className="py-20 md:py-28 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="section-header mb-14 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#FF6500]" />
            <span className="font-tech text-xs tracking-widest uppercase text-[#FF7A1A] font-semibold">
              ABOUT THE CREATOR
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white dark:text-white light:text-[#121212]">
            Personal Information
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#858585] max-w-xl font-body">
            Official profile verification, academic credentials, and direct contact details.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {infoCards.map((card, idx) => {
            const Icon = card.icon;
            const content = (
              <div
                key={idx}
                className={`relative group rounded-2xl p-6 transition-all duration-300 ${
                  card.highlight
                    ? 'bg-gradient-to-b from-[#181818] to-[#101010] dark:from-[#181818] dark:to-[#101010] light:from-white light:to-orange-50/50 border border-[#FF6500]/50 shadow-[0_4px_25px_rgba(255,101,0,0.12)] hover:border-[#FF6500]'
                    : 'bg-[#121212]/80 dark:bg-[#121212]/80 light:bg-white/90 border border-white/5 dark:border-white/5 light:border-black/5 hover:border-[#FF6500]/30 shadow-sm'
                } backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,101,0,0.15)] flex flex-col justify-between`}
              >
                {/* Top Row: Icon + Orange Accent indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${
                    card.highlight
                      ? 'bg-[#FF6500]/20 text-[#FF7A1A]'
                      : 'bg-white/5 dark:bg-white/5 light:bg-slate-100 text-[#FFB347]'
                  }`}>
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  {card.href && (
                    <ExternalLink className="w-4 h-4 text-[#858585] group-hover:text-[#FF7A1A] transition-colors" />
                  )}
                  {card.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6500] shadow-[0_0_6px_#FF6500]" />
                  )}
                </div>

                {/* Details */}
                <div>
                  <span className="font-tech text-xs tracking-wider uppercase text-[#858585] block mb-1">
                    {card.label}
                  </span>
                  <div className={`text-base sm:text-lg break-words ${card.customClass || 'font-display font-semibold text-white dark:text-white light:text-[#121212]'}`}>
                    {card.value}
                  </div>
                </div>

                {/* Bottom subtle glow line */}
                <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#FF6500]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );

            if (card.href) {
              return (
                <a
                  key={idx}
                  href={card.href}
                  className="block focus:outline-none focus:ring-2 focus:ring-[#FF6500]/50 rounded-2xl"
                >
                  {content}
                </a>
              );
            }

            return content;
          })}
        </div>

      </div>
    </section>
  );
};
