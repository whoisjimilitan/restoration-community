'use client';

import Navigation from './components/landing/Navigation';
import HeroSection from './components/landing/HeroSection';
import RecognitionSection from './components/landing/RecognitionSection';
import FounderTestimonySection from './components/landing/FounderTestimonySection';
import JourneySection from './components/landing/JourneySection';
import HonestWorkSection from './components/landing/HonestWorkSection';
import CommunitySection from './components/landing/CommunitySection';
import InvitationSection from './components/landing/InvitationSection';
import Footer from './components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-rc-bg">
        <HeroSection />
        <RecognitionSection />
        <FounderTestimonySection />
        <JourneySection />
        <HonestWorkSection />
        <CommunitySection />
        <InvitationSection />
      </main>
      <Footer />
    </>
  );
}
