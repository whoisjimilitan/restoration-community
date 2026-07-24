'use client';

import Navigation from './components/landing/Navigation';
import HeroSection from './components/landing/HeroSection';
import WhyWeExistSection from './components/landing/WhyWeExistSection';
import WhatHappensNextSection from './components/landing/WhatHappensNextSection';
import FinalInvitationSection from './components/landing/FinalInvitationSection';
import Footer from './components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-rc-bg">
        {/* Trust Funnel: Move visitor from uncertainty to beginning */}

        {/* 1. Hero: Recognition & Truth */}
        <HeroSection />

        {/* 2. Why We Exist: Establish purpose */}
        <WhyWeExistSection />

        {/* 3. What Happens Next: Show the journey begins */}
        <WhatHappensNextSection />

        {/* 4. Final Invitation: Clear CTA as natural conclusion */}
        <FinalInvitationSection />
      </main>
      <Footer />
    </>
  );
}
