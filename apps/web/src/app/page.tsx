'use client';

import Navigation from './components/landing/Navigation';
import HeroSection from './components/landing/HeroSection';
import RecognitionSection from './components/landing/RecognitionSection';
import HonestWorkSection from './components/landing/HonestWorkSection';
import JourneySection from './components/landing/JourneySection';
import CommunitySection from './components/landing/CommunitySection';
import ChristSection from './components/landing/ChristSection';
import InvitationSection from './components/landing/InvitationSection';
import Footer from './components/landing/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="bg-rc-bg">
        {/* SCENE ONE: Arrival */}
        <HeroSection />

        {/* SCENE TWO & THREE: Recognition & Truth */}
        <RecognitionSection />

        {/* SCENE FOUR: Hope */}
        <HonestWorkSection />

        {/* SCENE FIVE: Journey */}
        <JourneySection />

        {/* SCENE SIX: Community */}
        <CommunitySection />

        {/* SCENE SEVEN: Christ (Emotional Centre) */}
        <ChristSection />

        {/* SCENE EIGHT: Invitation */}
        <InvitationSection />
      </main>
      <Footer />
    </>
  );
}
