import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const SYSTEM_PILLARS = [
  {
    id: 'radar',
    index: '01',
    category: 'PROXIMITY ENGINE',
    title: 'Echo Radar (0.5km to 10km)',
    subtitle: 'Physical presence over global algorithms.',
    description: 'Echo tracks real-time location proximity to visualize everyone within 300 meters to 10 kilometers. Instead of endless feeds from people on the other side of the planet, your radar reveals active clusters walking the same streets as you.',
    image: '/assets/screen_shots/echo_radar.jpeg',
    specs: [
      { label: 'Scanning Radius', value: '0.5km - 10.0km' },
      { label: 'Detection Speed', value: 'Real-time (<1s)' },
      { label: 'Privacy', value: 'Proximity Obfuscated' }
    ]
  },
  {
    id: 'sonar',
    index: '02',
    category: 'TARGETED DISCOVERY',
    title: 'Targeted Sonar (Instant)',
    subtitle: 'Filter proximity by profession, passion, or skill.',
    description: 'Need a guitarist for an acoustic session, a backend engineer for a hackathon, or an emergency doctor nearby? Run an instant sonar scan. Or set "Notify Me" and go about your day — Echo silently alerts you the moment your target profile enters your perimeter.',
    image: '/assets/screen_shots/profile_screen.jpeg',
    specs: [
      { label: 'Filter Modes', value: 'Instant & Passive Background' },
      { label: 'Alert Type', value: 'Silent Push Notification' },
      { label: 'Match Precision', value: 'Hobbies & Roles' }
    ]
  },
  {
    id: 'whisper',
    index: '03',
    category: 'GEOFENCED FEED',
    title: 'The 5km Whisper Geofence',
    subtitle: 'Local video, audio confessions, and campus news.',
    description: 'Drop short video reels, voice notes, photos, and PDFs. Everything posted in Whisper is restricted to users within 5 kilometers. Use the built-in neural Voice Changer for 100% anonymous campus confessions, local reporting, or unfiltered thoughts.',
    image: '/assets/screen_shots/whisper_feed.jpeg',
    specs: [
      { label: 'Geofence Radius', value: 'Strict 5km Perimeter' },
      { label: 'Supported Media', value: 'Video, Audio, PDF, Reels' },
      { label: 'Anonymity', value: 'AI Voice Changer + Stealth' }
    ]
  },
  {
    id: 'pro',
    index: '04',
    category: 'PRO SUITE',
    title: 'Ghost Mode & Broadcasts',
    subtitle: 'Advanced stealth and city-wide push alerts.',
    description: 'See who visited your profile when you were at the gym or café. Enable Ghost Mode to browse the radar while staying completely invisible to other scans. Or drop a Broadcast Whisper to trigger a push notification to every single user within 5km.',
    image: '/assets/screen_shots/chat_screen.jpeg',
    specs: [
      { label: 'Profile Stalker', value: 'Real-time Visitor Logs' },
      { label: 'Cloak Level', value: '100% Ghost Stealth' },
      { label: 'Broadcast Reach', value: 'All Users in 5km' }
    ]
  }
];

export default function SplitScreenShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const activePillar = SYSTEM_PILLARS[activeTab];

  return (
    <section id="split-showcase" className="py-24 border-t border-[#181818] bg-[#0A0A0C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            How Echo operates
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Select a core subsystem below to inspect its mobile interface.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-16 items-center">
          
          {/* Left Panel: Accordion Content */}
          <div className="w-full lg:w-1/2 space-y-4">
            {SYSTEM_PILLARS.map((pillar, idx) => {
              const isActive = activeTab === idx;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActiveTab(idx)}
                  className={`rounded-2xl cursor-pointer transition-all duration-300 border overflow-hidden ${
                    isActive
                      ? 'bg-[#14141A] border-[#FF9500]/50 shadow-xl shadow-black/40'
                      : 'bg-[#0E0E12] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-mono font-bold ${isActive ? 'text-[#FF9500]' : 'text-zinc-600'}`}>
                        {pillar.index}
                      </span>
                      <h3 className={`text-lg sm:text-xl font-bold ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                        {pillar.title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'rotate-180 text-[#FF9500]' : 'text-zinc-600'}`} />
                  </div>

                  <div className={`grid transition-all duration-300 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-0">
                        <p className="text-sm text-[#FF9500] font-medium mb-3">
                          {pillar.subtitle}
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                          {pillar.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/5">
                          {pillar.specs.map((spec) => (
                            <div key={spec.label} className="bg-black/30 p-2.5 rounded-xl border border-white/5">
                              <span className="text-[10px] text-zinc-500 block uppercase font-mono">
                                {spec.label}
                              </span>
                              <span className="text-xs font-semibold text-zinc-200 mt-0.5 block">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-6">
              <a
                href="https://play.google.com/store/apps/details?id=com.papercode.echo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-[#FF9500] text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#E68600] transition-colors shadow-lg shadow-black/50"
              >
                <span>Install Echo Free on Android</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Panel: Cinematic High-Fidelity 3D Device */}
          <div className="w-full lg:w-1/2 flex justify-center items-center py-12 lg:py-0 relative" style={{ perspective: '2000px' }}>
            
            {/* Cinematic Ambient Backlight Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gradient-to-tr from-[#FF9500]/20 to-[#4F46E5]/20 blur-[80px] rounded-full pointer-events-none z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white/5 blur-[50px] rounded-full pointer-events-none z-0" />

            {/* Locked 3D Device Container */}
            <div 
              className="relative w-[300px] sm:w-[320px] aspect-[9/19.5] z-10"
              style={{ 
                transform: 'rotateY(-18deg) rotateX(12deg) rotateZ(-2deg)', 
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Outer Metallic Rim Light & Deep Shadow */}
              <div 
                className="absolute inset-[-4px] rounded-[52px] bg-gradient-to-br from-white/40 via-[#2A2A35]/50 to-[#FF9500]/30 shadow-[-20px_30px_60px_rgba(0,0,0,0.8)]" 
                style={{ transform: 'translateZ(-4px)' }} 
              />
              
              {/* Thick Hardware Body (Titanium finish) */}
              <div 
                className="absolute inset-0 rounded-[48px] bg-gradient-to-tr from-[#1A1A24] to-[#2A2A35]" 
                style={{ transform: 'translateZ(-2px)' }} 
              />

              {/* Front Screen Bezel */}
              <div className="absolute inset-0 bg-black rounded-[48px] p-[10px] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]">
                
                {/* Inner Screen Area */}
                <div className="relative w-full h-full bg-[#0A0A0C] rounded-[38px] overflow-hidden">
                  

                  {/* UI Image Content */}
                  <img
                    key={activePillar.id}
                    src={activePillar.image}
                    alt={activePillar.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-opacity duration-500 bg-black"
                  />

                  {/* Cinematic Screen Glare / Glass Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-30 pointer-events-none mix-blend-screen" />
                  <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-b from-white/5 to-transparent rotate-45 z-30 pointer-events-none translate-y-[-10%]" />

                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}