import React, { useState, useEffect } from 'react';
import { Download, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenDownload }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Overview', href: '#' },
    { label: 'Proximity Engine', href: '#split-showcase' },
    { label: 'Scenarios', href: '#use-cases' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#222]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <img
            src="/assets/icons/app_logo.png"
            alt="Echo"
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="text-white font-bold text-lg tracking-wide">Echo</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-[#999] hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.papercode.echo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FF9500] text-black text-sm font-semibold hover:bg-[#E68600] transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[#999] hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-[#222] px-6 py-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-[#999] hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://play.google.com/store/apps/details?id=com.papercode.echo"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-2.5 rounded-lg bg-[#FF9500] text-black text-sm font-semibold"
          >
            Download on Google Play
          </a>
        </div>
      )}
    </header>
  );
}
