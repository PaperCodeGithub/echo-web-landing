import React from 'react';
import { Eye, EyeOff, Megaphone, ArrowRight } from 'lucide-react';

const PRO = [
  {
    icon: Eye,
    title: 'Profile visitors',
    description: 'See exactly who viewed your profile — the person at the gym, the one at the café. Know who\'s checking you out.',
  },
  {
    icon: EyeOff,
    title: 'Ghost mode',
    description: 'Browse the radar invisibly. See everyone around you while staying completely hidden from their scans.',
  },
  {
    icon: Megaphone,
    title: 'Broadcast whispers',
    description: 'Push a notification to every Echo user within 5km when you drop a whisper. Maximum reach for events and alerts.',
  },
];

export default function ProFeatures({ onOpenDownload }) {
  return (
    <section id="pro" className="py-24 border-t border-[#181818]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="text-[#FF9500] text-sm font-medium mb-3">Echo Pro</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Unlock advanced capabilities
            </h2>
            <p className="text-[#999] text-base leading-relaxed">
              Pro features are available as an in-app upgrade.
            </p>
          </div>
          <button
            onClick={onOpenDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF9500] text-black text-sm font-semibold hover:bg-[#E68600] transition-colors self-start sm:self-auto"
          >
            Get Echo Pro
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRO.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-[#141414] rounded-2xl border border-[#222] p-6 hover:border-[#333] transition-colors"
              >
                <Icon className="w-5 h-5 text-[#FF9500] mb-4" />
                <h3 className="text-white font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-[#999] leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
