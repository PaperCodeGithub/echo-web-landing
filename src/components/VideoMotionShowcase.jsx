import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart } from 'lucide-react';

const REELS = [
  {
    id: 'dance',
    title: 'Inter-College Dance Fest — Live from backstage',
    author: 'Manindra Seth',
    dist: '120m',
    time: 'Just now',
    likes: 342,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-dancing-under-neon-lights-42861-large.mp4',
  },
  {
    id: 'acoustic',
    title: 'Late night acoustic jam under streetlights',
    author: 'Anonymous',
    dist: '450m',
    time: '12 min ago',
    likes: 890,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-guitarist-playing-an-acoustic-guitar-42526-large.mp4',
  },
  {
    id: 'crowd',
    title: 'Flash mob at Metro Gate 3',
    author: 'Local Scout',
    dist: '800m',
    time: '24 min ago',
    likes: 1250,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-excited-crowd-at-a-music-festival-42533-large.mp4',
  },
];

export default function VideoMotionShowcase({ onOpenDownload }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const reel = REELS[activeIndex];

  // Auto-play on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setPlaying(true);
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.35 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Switch video when reel changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  }, [activeIndex]);

  return (
    <section id="whisper" ref={sectionRef} className="py-24 border-t border-[#181818]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <p className="text-[#FF9500] text-sm font-medium mb-3">Whisper Feed</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Hyperlocal content within 5km
          </h2>
          <p className="text-[#999] text-base leading-relaxed">
            Drop videos, voice notes, confessions, and photos visible only to
            people within 5 kilometers. Go fully anonymous with the built-in voice changer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Phone with video */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[300px]">
              {/* Phone shell */}
              <div className="rounded-[36px] bg-[#1A1A1A] p-2.5 border border-[#2A2A2A] shadow-xl shadow-black/40">
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#0A0A0A] rounded-full z-20" />

                {/* Video */}
                <div className="relative rounded-[28px] overflow-hidden bg-black aspect-[9/19.5]">
                  <video
                    ref={videoRef}
                    src={reel.videoUrl}
                    loop
                    muted={muted}
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                  {/* Top bar */}
                  <div className="absolute top-10 left-3 right-3 z-10 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-white/80 bg-black/40 px-2 py-0.5 rounded-full">
                      WHISPER • 5KM
                    </span>
                    <button
                      onClick={() => { videoRef.current && (videoRef.current.muted = !muted); setMuted(!muted); }}
                      className="p-1.5 rounded-full bg-black/40 text-white/70 hover:text-white"
                    >
                      {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Center play/pause */}
                  <button
                    onClick={() => {
                      if (playing) videoRef.current?.pause();
                      else videoRef.current?.play().catch(() => {});
                      setPlaying(!playing);
                    }}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity z-10"
                  >
                    {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>

                  {/* Right side actions */}
                  <div className="absolute right-3 bottom-20 z-10 flex flex-col items-center gap-4">
                    <button
                      onClick={() => setLiked(!liked)}
                      className="flex flex-col items-center gap-0.5"
                    >
                      <Heart className={`w-5 h-5 ${liked ? 'fill-[#FF9500] text-[#FF9500]' : 'text-white/80'}`} />
                      <span className="text-[10px] text-white/60">{reel.likes + (liked ? 1 : 0)}</span>
                    </button>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-3 left-3 right-12 z-10">
                    <p className="text-xs font-semibold text-white">{reel.author}</p>
                    <p className="text-[11px] text-white/70 mt-0.5 line-clamp-2">{reel.title}</p>
                    <p className="text-[10px] text-white/40 mt-1">{reel.dist} away • {reel.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Info & reel selector */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Your neighborhood, uncensored
              </h3>
              <p className="text-[#999] text-sm leading-relaxed">
                Whispers support images, videos, PDFs, Instagram reels, YouTube
                shorts, and audio notes. Use the in-app voice changer to post
                completely anonymously — perfect for college confessions, local
                news tips, or campus gossip.
              </p>
            </div>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2">
              {['Anonymous mode', 'Voice changer', 'Video & audio', 'PDF sharing', '5km geofence'].map((f) => (
                <span key={f} className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#222] text-xs text-[#999]">
                  {f}
                </span>
              ))}
            </div>

            {/* Reel selector */}
            <div className="space-y-2">
              <p className="text-xs text-[#666] uppercase tracking-wider font-medium">Nearby drops</p>
              {REELS.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => { setActiveIndex(i); setLiked(false); }}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-colors ${
                    activeIndex === i
                      ? 'bg-[#1A1A1A] border border-[#FF9500]/30'
                      : 'bg-transparent border border-transparent hover:bg-[#141414]'
                  }`}
                >
                  <div>
                    <p className={`text-sm font-medium ${activeIndex === i ? 'text-white' : 'text-[#999]'}`}>
                      {r.title}
                    </p>
                    <p className="text-xs text-[#666] mt-0.5">{r.author} • {r.dist}</p>
                  </div>
                  <span className="text-xs text-[#666]">{r.time}</span>
                </button>
              ))}
            </div>

            <button
              onClick={onOpenDownload}
              className="px-5 py-2.5 rounded-lg bg-[#FF9500] text-black text-sm font-semibold hover:bg-[#E68600] transition-colors"
            >
              Drop your first Whisper
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
