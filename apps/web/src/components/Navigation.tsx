'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import DeliveringRequestModal from './DeliveringRequestModal';

// Reads ?prayer=1 so /get-help (redirected in next.config.js) and any other
// link into the prayer flow can open the modal from anywhere, not just from
// a dedicated page. Needs its own Suspense boundary — useSearchParams
// requires one in the App Router, same pattern as AttendParamWatcher.
//
// Critically, it also strips the param from the URL once it's fired. Without
// this, every re-render (including the one caused by opening the modal
// itself) re-runs this effect, sees ?prayer=1 still sitting in the URL, and
// reopens the modal — which made Close appear completely broken.
function PrayerParamWatcher({ onOpen }: { onOpen: () => void }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (searchParams.get('prayer') === '1') {
      onOpen();
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, onOpen, pathname, router]);
  return null;
}

// Order follows the narrative arc, not alphabetical/feature convenience:
// who Weje was -> the book's deeper account -> why deliverance was possible ->
// who's left after deliverance -> proof it's not just him -> the reader's own turn.
const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/my-story', label: 'The Series' },
  { href: '/book', label: 'Book' },
  { href: '/deliverances', label: 'Deliverances' },
];

export default function Navigation() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);
  const openPrayer = useCallback(() => setIsPrayerOpen(true), []);

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
      <Suspense fallback={null}>
        <PrayerParamWatcher onOpen={openPrayer} />
      </Suspense>

      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 h-16 flex items-center justify-end gap-8">
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

        {/* Ask for Prayer — present on every page, opens the modal directly.
            No navigation, no dedicated page: reaching prayer should never cost
            someone the moment they're already in. */}
        <button
          type="button"
          onClick={() => setIsPrayerOpen(true)}
          className={`hidden md:inline-flex text-xs font-medium uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-300 hover:scale-[1.02] ${
            isLight
              ? 'text-white bg-white/10 border-white/25 hover:bg-white/20'
              : 'text-rc-accent bg-rc-accent/10 border-rc-accent/30 hover:bg-rc-accent/20'
          }`}
        >
          Ask for Prayer
        </button>

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
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsPrayerOpen(true);
                }}
                className="text-left text-base font-medium text-rc-accent py-3 transition-colors duration-200"
              >
                Ask for Prayer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DeliveringRequestModal isOpen={isPrayerOpen} onClose={() => setIsPrayerOpen(false)} />
    </nav>
  );
}
