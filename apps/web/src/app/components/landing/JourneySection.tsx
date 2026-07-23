'use client';

import { useState, useEffect } from 'react';

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
  const [visibleStages, setVisibleStages] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    // Stagger reveal of stages as page loads
    stages.forEach((_, index) => {
      setTimeout(() => {
        setVisibleStages((prev) => [...prev, index]);
      }, index * 150);
    });
  }, []);

  return (
    <section id="journey" className="w-full bg-rc-bg border-t border-rc-text/5">
      {/* SCENE FIVE: Journey — Path unfolds. Discovered. Extremely subtle motion. */}
      <div className="min-h-screen md:min-h-[120vh] flex flex-col justify-center px-6 sm:px-8 md:px-12 py-32 md:py-0">
        <div className="max-w-4xl mx-auto w-full">
          {/* Journey vertical path — like walking */}
          <div className="space-y-12 md:space-y-16">
            {/* Desktop: Horizontal path */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Subtle vertical line grows from top */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-rc-accent to-transparent opacity-30" />

                {/* Stages appear sequentially */}
                <div className="space-y-8">
                  {stages.map((stage, index) => (
                    <div
                      key={index}
                      className={`transform transition-all duration-700 ${
                        visibleStages.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <div className="pl-20 cursor-pointer group">
                        <div className="absolute left-2 w-8 h-8 rounded-full border border-rc-accent bg-rc-bg flex items-center justify-center text-sm font-medium text-rc-accent group-hover:bg-rc-accent group-hover:text-white transition-all duration-300">
                          {index + 1}
                        </div>
                        <button
                          onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                          className="text-left"
                        >
                          <p className="text-lg font-medium text-rc-text group-hover:text-rc-accent transition-colors duration-300">
                            {stage.name}
                          </p>
                          {selectedIndex === index && (
                            <p className="text-base text-rc-text-secondary mt-2 fade-in">
                              {stage.description}
                            </p>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: Stacked path */}
            <div className="md:hidden space-y-4">
              {stages.map((stage, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-500 ${
                    visibleStages.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  <button
                    onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                    className="w-full text-left p-4 border border-rc-text/10 rounded-lg hover:border-rc-accent transition-colors duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-rc-accent flex items-center justify-center text-sm font-medium text-rc-accent group-hover:bg-rc-accent group-hover:text-white transition-all duration-300">
                        {index + 1}
                      </div>
                      <p className="font-medium text-rc-text">{stage.name}</p>
                    </div>
                    {selectedIndex === index && (
                      <p className="mt-3 ml-11 text-rc-text-secondary text-sm fade-in">
                        {stage.description}
                      </p>
                    )}
                  </button>
                </div>
              ))}
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
          animation: fadeIn 300ms ease-out;
        }
      `}</style>
    </section>
  );
}
