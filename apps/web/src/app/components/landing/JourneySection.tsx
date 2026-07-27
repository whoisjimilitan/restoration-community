'use client';

const stages = [
  { name: 'Truth' },
  { name: 'Confession' },
  { name: 'Repentance' },
  { name: 'Forgiveness' },
  { name: 'Reconciliation' },
  { name: 'Honest Work' },
  { name: 'Serving' },
];

export default function JourneySection() {
  return (
    <section id="journey" className="section">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-20">
          {/* Heading */}
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-rc-navy leading-tight">
              The Journey of Truth
            </h2>
          </div>

          {/* Timeline */}
          <div>
            {/* Desktop Timeline */}
            <div className="hidden md:block">
              <div className="flex items-center justify-between relative py-4">
                {/* Connecting line */}
                <div className="absolute top-8 left-0 right-0 h-px bg-rc-border" />

                {/* Stages */}
                <div className="relative flex justify-between w-full">
                  {stages.map((stage, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center group"
                    >
                      <div className="w-14 h-14 rounded-full border-2 border-rc-border flex items-center justify-center font-medium text-sm text-rc-navy bg-rc-warm-white/70 group-hover:border-rc-accent group-hover:bg-rc-accent/10 transition-all duration-200">
                        {index + 1}
                      </div>
                      <div className="mt-6 text-center">
                        <p className="text-sm font-semibold text-rc-navy group-hover:text-rc-accent transition-colors">
                          {stage.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden space-y-3">
              {stages.map((stage, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-rc-warm-white/50 rounded-lg border border-rc-border hover:border-rc-accent hover:bg-rc-warm-white transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-rc-border flex items-center justify-center font-medium text-xs text-rc-navy bg-rc-warm-white/70 group-hover:border-rc-accent group-hover:bg-rc-accent/10 transition-all flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="font-semibold text-rc-navy text-sm group-hover:text-rc-accent transition-colors">{stage.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
