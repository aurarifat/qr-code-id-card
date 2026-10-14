import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SiteDataProvider } from './context/SiteDataContext';
import { Preloader } from './components/Preloader';
import { LiveBackground } from './components/LiveBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PersonalInfo } from './components/PersonalInfo';
import { GamingProfile } from './components/GamingProfile';
import { FavoriteWeapons } from './components/FavoriteWeapons';
import { PhotoGallery } from './components/PhotoGallery';
import { SocialMedia } from './components/SocialMedia';
import { FreelanceSkills } from './components/FreelanceSkills';
import { StudentLife } from './components/StudentLife';
import { SchoolInfo } from './components/SchoolInfo';
import { ContactSection } from './components/ContactSection';
import { FloatingControls } from './components/FloatingControls';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { AdminModal } from './components/AdminModal';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function PortfolioContent() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('aura_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'dark'; // Default is dark orange
      setTheme(initial);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('aura_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('light', nextTheme === 'light');
  };

  // GSAP Animations setup after preloader finishes
  useEffect(() => {
    if (!preloaderDone) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Dedicated subtle 'fade-in-up' entrance animation for all primary section headers
      const sectionHeaders = document.querySelectorAll('.section-header');
      sectionHeaders.forEach((header) => {
        const headerElements = header.children; // [eyebrow, h2, description paragraph]
        
        gsap.fromTo(
          headerElements,
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.09,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: header,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });

      // 2. Smooth coordinated reveal for section content cards & interactive grids
      const sections = ['#info', '#gaming', '#weapons', '#gallery', '#social', '#freelance', '#studentlife', '#school', '#contact'];
      sections.forEach((selector) => {
        const el = document.querySelector(selector);
        if (el) {
          const contentCards = el.querySelectorAll('.grid > div, .rounded-3xl, .rounded-2xl');
          if (contentCards.length > 0) {
            gsap.fromTo(
              contentCards,
              {
                y: 30,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power2.out',
                clearProps: 'transform,opacity',
                scrollTrigger: {
                  trigger: el.querySelector('.grid') || el,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                  once: true,
                },
              }
            );
          }
        }
      });
    });

    return () => ctx.revert();
  }, [preloaderDone]);

  return (
    <div className="relative min-h-screen bg-[#070707] dark:bg-[#070707] light:bg-[#F8F7F4] text-[#FAFAFA] dark:text-[#FAFAFA] light:text-[#121212] overflow-x-hidden selection:bg-[#FF6500] selection:text-black transition-colors duration-300">
      {/* Top Viewport Orange Scroll Progress Bar (GSAP ScrollTrigger) */}
      <ScrollProgressBar />

      {/* 1. Preloader */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* 2. Global Live Animated Background */}
      <LiveBackground />

      {/* 3. Fixed Navigation with Gallery link and Admin trigger */}
      <Navbar
        currentTheme={theme}
        onToggleTheme={toggleTheme}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* 4. Hero Section */}
        <Hero />

        {/* 5. Personal Information (#info) */}
        <PersonalInfo />

        {/* 6. Gaming Profile (#gaming) */}
        <GamingProfile />

        {/* 7. Favorite Weapons (#weapons) */}
        <FavoriteWeapons />

        {/* 8. Photo Gallery (#gallery) */}
        <PhotoGallery />

        {/* 9. Social Media (#social) */}
        <SocialMedia />

        {/* 10. Freelancing & Skills (#freelance) */}
        <FreelanceSkills />

        {/* 11. Student Life (#studentlife) */}
        <StudentLife />

        {/* 12. School Info (#school) */}
        <SchoolInfo />

        {/* 13. Contact (#contact) */}
        <ContactSection />
      </main>

      {/* 14. Floating Controls (Socials + Go to top) */}
      <FloatingControls />

      {/* 15. Footer */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* 16. Admin Modal & Live CMS Controller */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <PortfolioContent />
    </SiteDataProvider>
  );
}
