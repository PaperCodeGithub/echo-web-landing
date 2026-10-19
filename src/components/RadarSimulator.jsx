import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const PEOPLE = [
  { id: 1, name: 'Mayank Raj', role: 'Creative Designer', dist: '350m', x: 62, y: 62, img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80' },
  { id: 2, name: 'Manindra Seth', role: 'Software Engineer', dist: '620m', x: 45, y: 45, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
  { id: 3, name: 'Dr. Sarah Lin', role: 'Emergency Physician', dist: '780m', x: 32, y: 40, img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80' },
  { id: 4, name: 'Aria Kapoor', role: 'Indie Band Manager', dist: '1.2km', x: 70, y: 35, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' },
  { id: 5, name: 'Rohan Mehta', role: 'Angel Investor', dist: '1.8km', x: 25, y: 68, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
  { id: 6, name: 'Zara Chen', role: 'Music Producer', dist: '2.4km', x: 78, y: 72, img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80' },
];

export default function RadarSimulator({ onOpenDownload }) {
  const [radius, setRadius] = useState(2.0);
  const [selected, setSelected] = useState(PEOPLE[0]);

  const visible = PEOPLE.filter((p) => {
    const km = parseFloat(p.dist);
    return km <= radius || p.dist.includes('m') && parseInt(p.dist) / 1000 <= radius;
  });

  return (
    <section id="radar" className="py-24 border-t border-[#181818]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header — left aligned */}
        <div className="max-w-xl mb-14">
          <p className="text-[#FF9500] text-sm font-medium mb-3">Echo Radar</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See who's around you in real time
          </h2>
          <p className="text-[#999] text-base leading-relaxed">
            The radar scans from 0.5km to 10km and shows every Echo user
            physically near you. Adjust the radius and tap a person to see their profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Radar scope */}
          <div className="lg:col-span-7">
            {/* Radius control */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-[#666]">Radius</span>
              <span className="text-sm font-semibold text-white">{radius.toFixed(1)} km</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.1"
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              className="w-full accent-[#FF9500] h-1.5 rounded-lg bg-[#222] mb-6 cursor-pointer"
            />

            {/* Scope */}
            <div className="relative w-full aspect-square max-w-[500px] mx-auto bg-[#0E0E0E] rounded-full border border-[#1E1E1E] overflow-hidden">
              {/* Rings */}
              <div className="absolute inset-0 m-auto w-[30%] h-[30%] rounded-full border border-[#1A1A1A]" />
              <div className="absolute inset-0 m-auto w-[55%] h-[55%] rounded-full border border-[#1A1A1A]" />
              <div className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full border border-[#1A1A1A]" />

              {/* Crosshairs */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-[#1A1A1A]" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-[#1A1A1A]" />

              {/* Sweep */}
              <div
                className="absolute inset-0 radar-sweep pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(255,149,0,0.12) 0deg, transparent 50deg, transparent 360deg)'
                }}
              />

              {/* Center — you */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-4 h-4 rounded-full bg-[#FF9500] border-2 border-[#0E0E0E]" />
              </div>

              {/* People blips */}
              {visible.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className="absolute z-10 group focus:outline-none transition-transform hover:scale-110"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className={`w-9 h-9 rounded-full object-cover border-2 transition-colors ${
                      selected?.id === p.id
                        ? 'border-[#FF9500]'
                        : 'border-[#333] group-hover:border-[#555]'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Selected person */}
          <div className="lg:col-span-5">
            {selected && (
              <div className="bg-[#141414] rounded-2xl border border-[#222] p-6">
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={selected.img}
                    alt={selected.name}
                    className="w-14 h-14 rounded-full object-cover border border-[#333]"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{selected.name}</h4>
                    <p className="text-[#999] text-sm">{selected.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#FF9500] mb-5">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{selected.dist} away</span>
                </div>

                <div className="space-y-3 text-sm text-[#999] mb-6">
                  <p>
                    On Echo, you can view their full profile, linked social accounts, and even send them a direct message — all because you're physically nearby.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={onOpenDownload}
                    className="flex-1 py-2.5 rounded-lg bg-[#FF9500] text-black text-sm font-semibold hover:bg-[#E68600] transition-colors"
                  >
                    Send a message
                  </button>
                  <button
                    onClick={onOpenDownload}
                    className="px-4 py-2.5 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] text-sm text-[#999] hover:text-white transition-colors"
                  >
                    View profile
                  </button>
                </div>
              </div>
            )}

            {/* Real app screenshot */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-[#222]">
              <img
                src="/assets/screen_shots/echo_radar.jpeg"
                alt="Echo Radar in the actual app"
                className="w-full object-cover"
              />
              <div className="bg-[#141414] px-4 py-3 text-xs text-[#666]">
                Actual Echo Radar screenshot — live on Google Play
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
