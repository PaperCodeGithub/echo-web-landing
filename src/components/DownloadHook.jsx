import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DownloadHook() {
  return (
    <section className="py-32 border-t border-[#181818] bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16">
        
        {/* Left: Copy & Value Proposition */}
        <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Start seeing who's around you.
          </h2>
          
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed mb-10 max-w-xl">
            Every day you walk past people who share your interests, need your
            skills, or want to meet you. Echo makes the invisible visible.
          </p>
          
          {/* Subtle Trust Indicators */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium text-zinc-400">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF9500]" />
              <span>Free on Android</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF9500]" />
              <span>Zero radar ads</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF9500]" />
              <span>Secure Google Auth</span>
            </div>
          </div>
        </div>

        {/* Right: Primary Action */}
        <div className="flex-shrink-0 w-full lg:w-auto mt-8 lg:mt-0">
          <a
            href="https://play.google.com/store/apps/details?id=com.papercode.echo"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 px-8 py-5 w-full sm:w-auto rounded-full bg-[#FF9500] text-black text-base font-bold transition-all hover:bg-[#E68600] hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,149,0,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,149,0,0.5)]"
          >
            <span>Get it on Google Play</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        
      </div>
    </section>
  );
}