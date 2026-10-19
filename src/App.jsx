import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CinematicHero from './components/CinematicHero';
import SplitScreenShowcase from './components/SplitScreenShowcase';
import UseCases from './components/UseCases';
import DownloadHook from './components/DownloadHook';
import Footer from './components/Footer';
import DownloadModal from './components/DownloadModal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  return (
    <div className="min-h-screen bg-[#060608] text-[#E5E5E5] antialiased">
      {/* Fixed Navbar */}
      <Navbar onOpenDownload={open} />

      <main>
        {/* 1. Full-Width Cinematic Mockup Hero with Centered Commercial Headlines */}
        <CinematicHero onOpenDownload={open} />

        {/* 2. New 50/50 Split-Screen System Architecture View */}
        <SplitScreenShowcase onOpenDownload={open} />

        {/* 3. Real-World Proximity Scenarios */}
        <UseCases onOpenDownload={open} />

        {/* 4. High-Conversion Download Callout */}
        <DownloadHook onOpenDownload={open} />
      </main>

      {/* Official Legal & Social Footer */}
      <Footer />

      {/* Download Modal Dialog */}
      <DownloadModal isOpen={modalOpen} onClose={close} />
    </div>
  );
}
