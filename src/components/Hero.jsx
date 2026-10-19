import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onOpenDownload }) {
  const [count, setCount] = useState(0);

  // Animate user count on mount
  useEffect(() => {
    let current = 0;
    const target = 205;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCount(current);
    }, 25);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Subtle top-right gradient — just one, very muted */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF9500]/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-[#FF9500] text-sm font-medium tracking-wide uppercase">
                Proximity Social Network
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                Connect with people
                <br />
                <span className="text-[#FF9500]">around you.</span>
              </h1>
              <p className="text-[#999] text-lg leading-relaxed max-w-md">
                Echo shows you real people within 300m to 10km. Not algorithms,
                not strangers across the globe — the humans walking the same
                streets as you, right now.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.papercode.echo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF9500] text-black font-semibold text-sm hover:bg-[#E68600] transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M3.609 1.814L13.792 12 3.61 22.186a.326.326 0 01-.344-.135V1.95c0-.27.154-.325.343-.136zM15.207 13.414l2.793 2.793-13.682 7.734 10.889-10.527zm0-2.828L4.318.06l13.682 7.733-2.793 2.793zm1.414 1.414l3.707-3.707a1 1 0 011.414 0l.293.293a1 1 0 010 1.414l-4.707 4.707-1.414-1.414-.707-1.293.707-1.293z"/></svg>
                Get it on Google Play
              </a>
              <a
                href="#radar"
                className="inline-flex items-center gap-2 text-sm text-[#999] hover:text-white transition-colors group"
              >
                See how it works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Stats row — understated */}
            <div className="flex items-center gap-8 pt-4 border-t border-[#222]">
              <div>
                <p className="text-white text-2xl font-semibold">{count}+</p>
                <p className="text-[#666] text-xs mt-0.5">People nearby right now</p>
              </div>
              <div className="w-px h-8 bg-[#222]" />
              <div>
                <p className="text-white text-2xl font-semibold">0.3–10km</p>
                <p className="text-[#666] text-xs mt-0.5">Dynamic scanning range</p>
              </div>
              <div className="w-px h-8 bg-[#222]" />
              <div>
                <p className="text-white text-2xl font-semibold">4.9★</p>
                <p className="text-[#666] text-xs mt-0.5">Play Store rating</p>
              </div>
            </div>
          </div>

          {/* Right — Hero phone mockup (static, clean) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-[280px] sm:w-[300px] rounded-[40px] bg-[#1A1A1A] p-3 border border-[#2A2A2A] shadow-2xl shadow-black/50">
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0A0A0A] rounded-full z-10" />
                {/* Screen */}
                <img
                  src="/assets/screen_shots/echo_radar.jpeg"
                  alt="Echo Radar — See nearby people in real time"
                  className="w-full rounded-[30px] aspect-[9/19.5] object-cover"
                />
              </div>
              {/* Floating secondary screen — offset behind */}
              <div className="absolute -right-12 -bottom-10 w-[180px] rounded-[28px] bg-[#1A1A1A] p-2 border border-[#2A2A2A] shadow-xl shadow-black/40 -rotate-6 opacity-80 hidden lg:block">
                <img
                  src="/assets/screen_shots/whisper_feed.jpeg"
                  alt="Whisper Feed"
                  className="w-full rounded-[22px] aspect-[9/19.5] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
