'use client';

import Navigation from './components/landing/Navigation';
import HeroSection from './components/landing/HeroSection';
import RecognitionSection from './components/landing/RecognitionSection';
import FounderTestimonySection from './components/landing/FounderTestimonySection';
import BridgeSection from './components/landing/BridgeSection';
import JourneySection from './components/landing/JourneySection';
import CommunitySection from './components/landing/CommunitySection';
import HonestWorkSection from './components/landing/HonestWorkSection';
import InvitationSection from './components/landing/InvitationSection';
import PartnersSection from './components/landing/PartnersSection';
import Footer from './components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-rc-bg">
        {/* 1. Recognition: Hero */}
        <HeroSection />

        {/* 2. Truth: Preparation */}
        <RecognitionSection />

        {/* 3. Evidence: Testimony */}
        <FounderTestimonySection />

        {/* 4. Bridge: Answer to doubts */}
        <BridgeSection />

        {/* 5. Restoration: Journey */}
        <JourneySection />

        {/* 6. Community: Support */}
        <CommunitySection />

        {/* 7. Life Restored: Fruit */}
        <HonestWorkSection />

        {/* 8. Final Invitation: Response */}
        <InvitationSection />

        {/* 9. Partners: Mission Support */}
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}
