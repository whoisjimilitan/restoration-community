'use client';

import Navigation from './components/landing/Navigation';
import HeroSection from './components/landing/HeroSection';
import FounderTestimonySection from './components/landing/FounderTestimonySection';
import WhatHappensNextSection from './components/landing/WhatHappensNextSection';
import FinalInvitationSection from './components/landing/FinalInvitationSection';
import Footer from './components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-rc-bg">
        {/* 1. The Encounter: Hero */}
        <HeroSection />

        {/* 2. The Witness: Founder Testimony */}
        <FounderTestimonySection />

        {/* 3. The Promise: After Deliverance Comes Restoration */}
        <WhatHappensNextSection />

        {/* 4. The Invitation: Final Call */}
        <FinalInvitationSection />
      </main>
      <Footer />
    </>
  );
}
