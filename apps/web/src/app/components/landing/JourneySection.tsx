'use client';

import { useState } from 'react';

const stages = [
  { name: 'Truth', description: 'Truth restores reality.' },
  { name: 'Confession', description: 'Confession restores honesty.' },
  { name: 'Repentance', description: 'Repentance restores direction.' },
  { name: 'Forgiveness', description: 'Forgiveness restores peace.' },
  { name: 'Reconciliation', description: 'Reconciliation restores relationships.' },
  { name: 'Honest Work', description: 'Honest work restores dignity.' },
  { name: 'Serving Others', description: 'Serving others restores purpose.' },
];

export default function JourneySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="journey" className="w-full py-24 md:py-32 bg-gradient-to-b from-rc-bg via-rc-cream-light to-rc-bg border-t border-rc-accent/10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-16">
          {/* Timeline */}
          <div>
            {/* Desktop Timeline */}
            <div className="hidden md:block">
              <div className="flex items-center justify-between relative">
                {/* Connecting line - enhanced */}
                <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rc-accent/40 to-transparent" />

                {/* Stages */}
                <div className="relative flex justify-between w-full">
                  {stages.map((stage, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <div
                        className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all duration-300 shadow-sm ${
                          selectedIndex === index
                            ? 'bg-rc-accent text-white border-rc-accent shadow-[0_8px_16px_rgba(15,118,110,0.25)]'
                            : 'bg-white border-rc-accent/20 text-rc-text group-hover:border-rc-accent group-hover:shadow-[0_4px_12px_rgba(15,118,110,0.12)]'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="mt-6 text-center">
                        <p
                          className={`text-sm font-semibold tracking-[0.01em] transition-all duration-200 ${
                            selectedIndex === index ? 'text-rc-accent' : 'text-rc-text group-hover:text-rc-accent'
                          }`}
                        >
                          {stage.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              {selectedIndex !== null && (
                <div className="mt-14 text-center fade-in p-8 bg-white/50 rounded-lg border border-rc-accent/10 backdrop-blur-sm">
                  <p className="text-lg text-rc-text leading-relaxed tracking-[-0.005em]">
                    {stages[selectedIndex].description}
                  </p>
                </div>
              )}
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden">
              <div className="space-y-3">
                {stages.map((stage, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                    className={`w-full text-left p-5 border rounded-lg transition-all duration-200 group ${
                      selectedIndex === index
                        ? 'bg-rc-accent/5 border-rc-accent shadow-[0_4px_12px_rgba(15,118,110,0.1)]'
                        : 'bg-white border-rc-accent/10 hover:border-rc-accent/30 hover:shadow-[0_2px_8px_rgba(15,118,110,0.05)]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
                        selectedIndex === index
                          ? 'bg-rc-accent text-white border-rc-accent'
                          : 'bg-white border-rc-accent/20 text-rc-text group-hover:border-rc-accent'
                      }`}>
                        {index + 1}
                      </div>
                      <p className={`font-semibold tracking-[0.01em] transition-colors duration-200 ${
                        selectedIndex === index ? 'text-rc-accent' : 'text-rc-text'
                      }`}>{stage.name}</p>
                    </div>
                    {selectedIndex === index && (
                      <p className="mt-4 ml-0 text-rc-text text-sm leading-relaxed">
                        {stage.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .fade-in {
          animation: fadeIn 400ms ease-out;
        }
      `}</style>
    </section>
  );
}
