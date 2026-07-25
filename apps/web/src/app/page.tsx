'use client';

import Navigation from './components/landing/Navigation';
import HeroSection from './components/landing/HeroSection';
import FounderTestimonySection from './components/landing/FounderTestimonySection';
import RecognitionSection from './components/landing/RecognitionSection';
import ChristSection from './components/landing/ChristSection';
import JourneySection from './components/landing/JourneySection';
import CommunitySection from './components/landing/CommunitySection';
import HonestWorkSection from './components/landing/HonestWorkSection';
import InvitationSection from './components/landing/InvitationSection';
import Footer from './components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-rc-bg">
        <HeroSection />
        <FounderTestimonySection />
        <RecognitionSection />
        <ChristSection />
        <JourneySection />
        <CommunitySection />
        <HonestWorkSection />
        <InvitationSection />
      </main>
      <Footer />
    </>
  );
}
