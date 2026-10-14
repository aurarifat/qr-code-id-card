import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Sparkles, Lock, Shield } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface NavbarProps {
  currentTheme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTheme, onToggleTheme, onOpenAdmin }) => {
  const { siteData } = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Info', href: '#info' },
    { label: 'Gaming', href: '#gaming' },
    { label: 'Weapons', href: '#weapons' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Social', href: '#social' },
    { label: 'Freelance', href: '#freelance' },
    { label: 'Student Life', href: '#studentlife' },
    { label: 'School Info', href: '#school' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Active section detection
      const sectionIds = ['info', 'gaming', 'weapons', 'gallery', 'social', 'freelance', 'studentlife', 'school', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          return;
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Derive brand initials and styled words
  const brandName = siteData.brandName || 'Aura RIFAT';
  const brandWords = brandName.trim().split(/\s+/);
  const initials =
    brandWords.length > 1
      ? (brandWords[0][0] + brandWords[1][0]).toUpperCase()
      : brandName.slice(0, 2).toUpperCase();
  const firstWord = brandWords[0];
  const restWords = brandWords.slice(1).join(' ');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#070707]/90 dark:bg-[#070707]/90 light:bg-[#F8F7F4]/90 backdrop-blur-xl border-b border-[#FF6500]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2.5 text-decoration-none shrink-0"
          aria-label={`${brandName} Home`}
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6500] to-[#D94700] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_12px_rgba(255,101,0,0.4)]">
            <div className="w-full h-full bg-[#0a0a0a] rounded-[6px] flex items-center justify-center">
              <span className="font-display font-black text-xs text-[#FF7A1A] tracking-wider">
                {initials}
              </span>
            </div>
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-white dark:text-white light:text-[#121212] flex items-center">
            {firstWord}
            {restWords && (
              <span className="text-[#FF6500] ml-1.5 font-black">{restWords}</span>
            )}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121212]/80 dark:bg-[#121212]/80 light:bg-white/80 border border-white/5 dark:border-white/5 light:border-black/5 backdrop-blur-md shadow-inner"
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap rounded-full ${
                  isActive
                    ? 'text-white font-semibold bg-[#FF6500]/20 text-[#FF7A1A] shadow-[0_0_12px_rgba(255,101,0,0.25)]'
                    : 'text-[#BDBDBD] dark:text-[#BDBDBD] light:text-[#555] hover:text-[#FAFAFA] dark:hover:text-white light:hover:text-black hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#FF6500] rounded-full shadow-[0_0_6px_#FF6500]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Icons: Admin Portal & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Admin Control Button in Menu */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] dark:bg-[#161616] light:bg-white border border-[#FF6500]/40 hover:border-[#FF6500] text-white dark:text-white light:text-black font-display font-semibold text-xs tracking-wide transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(255,101,0,0.3)] group cursor-pointer"
            title="Admin Login & Site Editor"
          >
            <Lock className="w-3.5 h-3.5 text-[#FF7A1A] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-full bg-[#161616] dark:bg-[#161616] light:bg-white border border-white/10 dark:border-white/10 light:border-black/10 hover:border-[#FF6500]/50 text-[#FAFAFA] dark:text-[#FAFAFA] light:text-[#121212] transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {currentTheme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#FFB347] transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-[#FF6500] transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-[#161616] border border-white/10 text-white hover:text-[#FF7A1A] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay / Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#FF6500]/20 bg-[#0A0A0A]/95 dark:bg-[#0A0A0A]/95 light:bg-[#F8F7F4]/98 backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#FF6500]/15 text-[#FF7A1A] font-semibold border border-[#FF6500]/30 shadow-[0_0_12px_rgba(255,101,0,0.2)]'
                      : 'text-[#BDBDBD] dark:text-[#BDBDBD] light:text-[#4A4A4A] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <Sparkles className="w-3.5 h-3.5 text-[#FF7A1A]" />}
                </a>
              );
            })}

            {/* Mobile Admin Link */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full mt-2 flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold bg-[#161616] border border-[#FF6500]/30 text-[#FF7A1A] hover:bg-[#FF6500] hover:text-black transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Admin Portal</span>
              </div>
              <span className="text-[11px] font-mono text-[#858585]">Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
