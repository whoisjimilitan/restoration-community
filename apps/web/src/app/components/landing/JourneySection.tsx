'use client';

import { useState } from 'react';

const stages = [
  { name: 'Truth', description: 'Truth restores reality.' },
  { name: 'Confession', description: 'Confession restores honesty.' },
  { name: 'Repentance', description: 'Repentance restores direction.' },
  { name: 'Forgiveness', description: 'Forgiveness restores peace.' },
  { name: 'Reconciliation', description: 'Reconciliation restores relationships.' },
  { name: 'Honest Work', description: 'Honest work restores dignity.' },
  { name: 'Serving', description: 'Serving restores purpose.' },
];

export default function JourneySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="journey" className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-16">
          {/* Heading */}
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              After Deliverance: The Restoration Journey
            </h2>
          </div>

          {/* Timeline */}
          <div>
            {/* Desktop Timeline */}
            <div className="hidden md:block">
              <div className="flex items-center justify-between relative">
                {/* Connecting line */}
                <div className="absolute top-6 left-0 right-0 h-px bg-rc-text/10" />

                {/* Stages */}
                <div className="relative flex justify-between w-full">
                  {stages.map((stage, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      <div
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-medium text-sm transition-all duration-200 ${
                          selectedIndex === index
                            ? 'bg-rc-accent text-white border-rc-accent'
                            : 'bg-rc-bg border-rc-text/20 text-rc-text group-hover:border-rc-accent'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="mt-4 text-center">
                        <p
                          className={`text-sm font-medium transition-colors duration-200 ${
                            selectedIndex === index ? 'text-rc-accent' : 'text-rc-text'
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
                <div className="mt-12 text-center fade-in">
                  <p className="text-lg text-rc-text">
                    {stages[selectedIndex].description}
                  </p>
                </div>
              )}
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden">
              <div className="space-y-4">
                {stages.map((stage, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                    className="w-full text-left p-4 border border-rc-text/10 rounded-lg hover:border-rc-accent transition-colors duration-200 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-rc-text/20 flex items-center justify-center font-medium text-sm group-hover:border-rc-accent transition-colors">
                        {index + 1}
                      </div>
                      <p className="font-medium text-rc-text">{stage.name}</p>
                    </div>
                    {selectedIndex === index && (
                      <p className="mt-3 ml-14 text-rc-text text-sm">
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
