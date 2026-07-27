'use client';

import HeroSection from '@/components/HeroSection';
import FourPillarsSection from '@/components/FourPillarsSection';

/**
 * Landing Page - Restoration Community
 *
 * Governance: Books 1-4, Engineering Charter
 *
 * Structure (Minimal + Complete):
 * 1. Hero - Establishes belonging, hope, Christ-centeredness
 * 2. Four Pillars - Shows platform identity and core experiences
 * 3. Why We Exist - Brief mission clarity
 * 4. Community Safety - Addresses concerns
 * 5. Begin - Final invitation
 *
 * This design honors:
 * - Book Four requirement: communicate identity from first moment
 * - Book Three principle: platform is first doorway
 * - Trust funnel philosophy: minimal information, clear path
 * - Four pillars requirement: visible from landing
 */

export default function Home() {
  return (
    <main className="w-full bg-white">
      {/* 1. HERO - Recognition, Belonging, Christ-Centered Hope */}
      <HeroSection />

      {/* 2. FOUR PILLARS - Platform Identity and Core Experiences */}
      <FourPillarsSection />

      {/* 3. WHY WE EXIST - Brief Mission and Heart */}
      <section className="w-full py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-headline-md mb-8">Why This Exists</h2>
          <p className="text-body-lg mb-6">
            The Restoration Community exists because no one should rebuild their life alone.
          </p>
          <p className="text-body-lg">
            If you have walked in deception and want to walk in truth. If you carry shame and want to receive grace. If you have been alone and want genuine community—this is for you.
          </p>
        </div>
      </section>

      {/* 4. COMMUNITY SAFETY - Addresses Concerns and Establishes Trust */}
      <section className="w-full py-16 px-6 bg-rc-cream-light">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-headline-md mb-8">A Safe Place</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-card-title font-serif font-bold text-rc-charcoal mb-2">
                Your story is confidential
              </h3>
              <p className="text-body-md text-rc-medium-gray">
                Nothing you share leaves the community. Privacy is protected. Trust is sacred.
              </p>
            </div>
            <div>
              <h3 className="text-card-title font-serif font-bold text-rc-charcoal mb-2">
                Grace, not judgment
              </h3>
              <p className="text-body-md text-rc-medium-gray">
                You are welcomed as someone God is restoring. Your past does not determine your value. Dignity is given freely.
              </p>
            </div>
            <div>
              <h3 className="text-card-title font-serif font-bold text-rc-charcoal mb-2">
                Honest accountability
              </h3>
              <p className="text-body-md text-rc-medium-gray">
                The community cares enough to speak truth. Accountability is exercised with humility, compassion, and love—never shame.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEGIN - Final Invitation */}
      <section className="w-full py-20 px-6 text-center bg-rc-teal">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-headline-md mb-6 text-white">Ready to Begin?</h2>
          <p className="text-body-lg mb-8 text-rc-cream">
            Your first step is simple. Create an account. Introduce yourself. Meet your community.
          </p>
          <a
            href="/auth/register"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md font-medium transition-all duration-300 bg-white text-rc-teal hover:bg-rc-cream hover:shadow-lg"
          >
            Begin Your Journey
          </a>
          <p className="mt-6 text-sm text-rc-border">
            It takes about 5 minutes to create an account and meet your community. You are taking your first step toward restoration.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t border-rc-border bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* About */}
            <div>
              <h3 className="text-eyebrow mb-4">About</h3>
              <p className="text-body-sm text-rc-medium-gray">
                The Restoration Community is a Christian peer support and reintegration community for people leaving cybercrime and pursuing honest work and living.
              </p>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-eyebrow mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-body-sm text-rc-teal link-hover">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-body-sm text-rc-teal link-hover">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-body-sm text-rc-teal link-hover">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div>
              <h3 className="text-eyebrow mb-4">Our Mission</h3>
              <p className="text-body-sm text-rc-medium-gray">
                Guiding people toward honest work and living.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-rc-border pt-8">
            <p className="text-body-sm text-center text-rc-warm-gray">
              © 2026 Restoration Community. All rights reserved. | Guiding people toward honest work and living.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
