import React from 'react';
import { Radio, Target, Bell, MessageSquare, Shield, Mic, Share2, Flame } from 'lucide-react';

const FEATURES = [
  {
    icon: Radio,
    title: 'Echo Radar',
    range: '0.5 – 10 km',
    description: 'Real-time map of everyone nearby. Watch clusters form as people move within your scanning radius.',
  },
  {
    icon: Target,
    title: 'Targeted Sonar — Instant',
    range: 'By profession or hobby',
    description: 'Need a guitarist, doctor, or developer? Run an instant sonar ping filtered by skills and interests.',
  },
  {
    icon: Bell,
    title: 'Targeted Sonar — Notify Me',
    range: 'Passive background scan',
    description: 'Set your criteria and go about your day. Echo alerts you the moment a matching person enters your radius.',
  },
  {
    icon: Flame,
    title: 'Whisper Feed',
    range: '5 km geofence',
    description: 'Post anything — text, video, audio, PDFs, reels — seen only by people within 5km. Disappears beyond that.',
  },
  {
    icon: Shield,
    title: 'Anonymous Mode',
    range: 'Full identity protection',
    description: 'Post campus confessions and local tips without revealing your identity. Zero traces, zero risk.',
  },
  {
    icon: Mic,
    title: 'Voice Changer',
    range: 'Real-time audio filter',
    description: 'Mask your voice with neural audio filters when recording voice notes or audio whispers.',
  },
  {
    icon: MessageSquare,
    title: 'Proximity Chat',
    range: 'Encrypted messaging',
    description: 'Direct message anyone on your radar. End-to-end encrypted conversations that start from physical proximity.',
  },
  {
    icon: Share2,
    title: 'Social Links',
    range: 'Instagram & Facebook sync',
    description: 'Link your public social profiles so people nearby can connect with you across platforms.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 border-t border-[#181818]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <p className="text-[#FF9500] text-sm font-medium mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built for real-world connections
          </h2>
          <p className="text-[#999] text-base leading-relaxed">
            Every feature in Echo is designed around physical proximity — not algorithms, not followers, not clout.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#222]">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-[#0E0E0E] p-6 hover:bg-[#141414] transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-5 h-5 text-[#FF9500]" />
                  <span className="text-[10px] text-[#555] font-medium uppercase tracking-wider">
                    {f.range}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#FF9500] transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-[#777] leading-relaxed">
                  {f.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
