'use client';

import Navigation from './components/landing/Navigation';
import HeroSection from './components/landing/HeroSection';
import FounderTestimonySection from './components/landing/FounderTestimonySection';
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

        {/* 2. Founder's Testimony: Proof that deliverance is possible */}
        <FounderTestimonySection />

        {/* 3. Why We Exist: Establish purpose */}
        <WhyWeExistSection />

        {/* 4. What Happens Next: Show the journey after deliverance */}
        <WhatHappensNextSection />

        {/* 5. Final Invitation: Confession/prayer not registration */}
        <FinalInvitationSection />
      </main>
      <Footer />
    </>
  );
}
