import React, { useState } from 'react';

const CASES = [
  {
    id: 'band',
    tab: 'Creatives',
    title: 'Find your bandmate on the same train',
    problem: 'A vocalist needs a band. A band manager two coaches ahead needs a vocalist. They never interact and the opportunity disappears.',
    solution: 'Echo\'s Targeted Sonar sends a silent notification: "The vocalist you\'re looking for is 45 meters away." They connect, rehearse, and book their first gig.',
    quote: '"We formed our band because Echo introduced us on Platform 4."',
  },
  {
    id: 'dating',
    tab: 'Dating',
    title: 'Real proximity, no fake profiles',
    problem: 'You notice someone interesting at a café or campus library. Approaching cold feels awkward, and dating apps show people 50km away.',
    solution: 'Echo shows they\'re 120m away with shared interests. Reply to their Whisper or send a proximity ping to start a natural conversation.',
    quote: '"No bots, no catfishing. You know the person is actually here."',
  },
  {
    id: 'emergency',
    tab: 'Emergency',
    title: 'Find a doctor before the ambulance',
    problem: 'Someone collapses at a marathon. The ambulance is stuck in traffic, 20 minutes out.',
    solution: 'An Emergency Sonar ping finds an off-duty doctor 200 meters away. She responds in 45 seconds — well before the ambulance arrives.',
    quote: '"In medical emergencies, every second counts. Proximity search saves lives."',
  },
  {
    id: 'campus',
    tab: 'Campus',
    title: 'Hyperlocal news and confessions',
    problem: 'A campus building locks down, an exam gets canceled, or someone wants to post an anonymous confession.',
    solution: 'Drop an anonymous Whisper geofenced to 5km. Thousands of nearby students see it within minutes — faster than any email chain.',
    quote: '"Our campus found out about the canceled exam 30 minutes before the official email."',
  },
];

export default function UseCases() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <section id="use-cases" className="py-24 border-t border-[#181818]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Real scenarios, real impact
          </h2>
          <p className="text-[#999] text-base leading-relaxed">
            Echo bridges the gap between digital presence and physical reality.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center gap-1 mb-10 bg-[#141414] rounded-xl p-1 w-fit">
          {CASES.map((cs, i) => (
            <button
              key={cs.id}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active === i
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-[#666] hover:text-[#999]'
              }`}
            >
              {cs.tab}
            </button>
          ))}
        </div>

        {/* Content Wrapper */}
        <div className="space-y-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            {c.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#222]">
              <p className="text-xs text-[#666] uppercase tracking-wider font-semibold mb-3">
                The problem
              </p>
              <p className="text-base text-[#999] leading-relaxed">
                {c.problem}
              </p>
            </div>
            
            <div className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-[#FF9500]/20">
              <p className="text-xs text-[#FF9500] uppercase tracking-wider font-semibold mb-3">
                How Echo solves it
              </p>
              <p className="text-base text-[#CCC] leading-relaxed">
                {c.solution}
              </p>
            </div>
          </div>

          <blockquote className="border-l-2 border-[#333] pl-5 py-1 text-base text-[#999] italic">
            {c.quote}
          </blockquote>
        </div>
        
      </div>
    </section>
  );
}