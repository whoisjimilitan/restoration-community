'use client';

import Navigation from './components/landing/Navigation';
import HeroSection from './components/landing/HeroSection';
import FounderTestimonySection from './components/landing/FounderTestimonySection';
import WhyWeExistSection from './components/landing/WhyWeExistSection';
import WhatHappensNextSection from './components/landing/WhatHappensNextSection';
import FinalInvitationSection from './components/landing/FinalInvitationSection';
import PartnershipSection from './components/landing/PartnershipSection';
import Footer from './components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-rc-bg">
        {/* 1. Hero: Recognition & Call */}
        <HeroSection />

        {/* 2. Founder's Testimony: Proof that deliverance is possible */}
        <FounderTestimonySection />

        {/* 3. Why We Exist: Establish purpose */}
        <WhyWeExistSection />

        {/* 4. After Deliverance: Show the restoration journey */}
        <WhatHappensNextSection />

        {/* 5. Final Invitation: Call to action */}
        <FinalInvitationSection />

        {/* 6. Partnership: Secondary invitation */}
        <PartnershipSection />
      </main>
      <Footer />
    </>
  );
}
