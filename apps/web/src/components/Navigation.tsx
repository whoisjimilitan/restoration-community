'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/my-story', label: 'My Story' },
  { href: '/book', label: 'Book' },
  { href: '/scriptures', label: 'Scriptures' },
  { href: '/get-help', label: 'Get Help' },
  { href: '/about', label: 'About' },
  { href: '/deliverances', label: 'Deliverances' },
];

export default function Navigation() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Every page has dark sections (hero, closing CTAs, etc.) separated by
  // light ones — a single "over the hero" check isn't enough, since
  // everything below the hero was wrongly assumed to be light. Every section
  // that needs light nav text carries data-nav-mode="light"; on scroll,
  // check whether any of them currently overlaps the strip of viewport the
  // fixed nav sits in (0 to 64px). Runs on every page, not just the homepage.
  useEffect(() => {
    setIsMenuOpen(false);

    const NAV_HEIGHT = 64;
    const checkDarkSections = () => {
      const darkSections = document.querySelectorAll('[data-nav-mode="light"]');
      let overDark = false;
      darkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= NAV_HEIGHT && rect.bottom >= 0) {
          overDark = true;
        }
      });
      setIsOverDark(overDark);
    };

    checkDarkSections();
    window.addEventListener('scroll', checkDarkSections, { passive: true });
    window.addEventListener('resize', checkDarkSections);
    return () => {
      window.removeEventListener('scroll', checkDarkSections);
      window.removeEventListener('resize', checkDarkSections);
    };
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Glass nav on every page: text color adapts to whichever section is
  // currently under it, but it always carries a translucent scrim (never
  // zero background), since blur alone doesn't guarantee contrast against a
  // moving video or busy content.
  const isLight = isOverDark;
  const showBorder = isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-colors duration-300 ${
        isLight ? 'bg-black/20' : 'bg-rc-bg/80'
      } ${showBorder ? 'border-b border-rc-border' : 'border-b border-transparent'}`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 h-16 flex items-center justify-end">
        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                isLight ? 'text-white/80 hover:text-white' : 'text-rc-text/70 hover:text-rc-text'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className={`md:hidden inline-flex items-center justify-center w-10 h-10 transition-colors duration-300 ${
            isLight ? 'text-white' : 'text-rc-text'
          }`}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <>
                <line x1="1" y1="1" x2="19" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="19" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-rc-bg border-b border-rc-border overflow-hidden"
          >
            <div className="px-6 sm:px-8 py-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base text-rc-text/80 hover:text-rc-text py-3 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
