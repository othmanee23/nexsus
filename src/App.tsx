import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DivisionsGrid } from './components/DivisionsGrid';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { LoadingScreen } from './components/LoadingScreen';

export const App: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactDivision, setContactDivision] = useState<string>('group');

  const handleOpenContact = (divisionId = 'group') => {
    setContactDivision(divisionId);
    setContactOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white flex flex-col justify-between">
      {/* Intro Loading Screen with Centered Logo & Zoom-Out Website Entry */}
      <LoadingScreen durationMs={1600} />

      {/* Top Header */}
      <Header
        onOpenContact={() => handleOpenContact('group')}
        onNavigate={handleNavigate}
      />

      {/* Main Content: Hero, Disciplines Interactive Grid, and About The Brand */}
      <main className="flex-1 w-full flex flex-col">
        <Hero
          onOpenContact={() => handleOpenContact('group')}
          onSelectDivision={(id) => handleOpenContact(id)}
        />

        {/* Divisions Interactive Showcase & Cards Grid */}
        <DivisionsGrid
          onSelectDivision={(id) => handleOpenContact(id)}
          onOpenContact={() => handleOpenContact('group')}
        />

        {/* High-Level About The Brand Section */}
        <AboutSection
          onOpenContact={() => handleOpenContact('group')}
        />
      </main>

      {/* Minimal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenContact={() => handleOpenContact('group')}
        onSelectDivision={(id) => handleOpenContact(id)}
      />

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        preselectedDivision={contactDivision}
      />

      <Analytics />
    </div>
  );
};

export default App;
