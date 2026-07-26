'use client';

import Navigation from './components/landing/Navigation';
import HeroSection from './components/landing/HeroSection';
import RecognitionSection from './components/landing/RecognitionSection';
import FounderTestimonySection from './components/landing/FounderTestimonySection';
import ChristSection from './components/landing/ChristSection';
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

        {/* 4. Hope: Christ Centred */}
        <ChristSection />

        {/* 5. Restoration: Journey */}
        <JourneySection />

        {/* 6. Community: Support */}
        <CommunitySection />

        {/* 7. Life Restored: Fruit */}
        <HonestWorkSection />

        {/* 8. Response: Invitation */}
        <InvitationSection />

        {/* 9. Partnership: Stand With Us */}
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}
