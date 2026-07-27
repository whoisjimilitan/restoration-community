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
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-32 md:py-48">
        <div className="space-y-32">
          {/* Heading */}
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-rc-text leading-tight">
              The Journey of Truth
            </h2>
          </div>

          {/* Timeline */}
          <div>
            {/* Desktop Timeline */}
            <div className="hidden md:block">
              <div className="flex items-center justify-between relative py-8">
                {/* Connecting line */}
                <div className="absolute top-10 left-0 right-0 h-px bg-rc-border" />

                {/* Stages */}
                <div className="relative flex justify-between w-full gap-4">
                  {stages.map((stage, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center group flex-1"
                    >
                      <div className="w-16 h-16 rounded-full border-2 border-rc-border flex items-center justify-center font-bold text-base text-rc-text bg-transparent group-hover:border-rc-accent group-hover:text-rc-accent transition-all duration-200">
                        {index + 1}
                      </div>
                      <div className="mt-8 text-center">
                        <p className="text-base font-bold text-rc-text group-hover:text-rc-accent transition-colors">
                          {stage.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden space-y-4">
              {stages.map((stage, index) => (
                <div
                  key={index}
                  className="flex items-center gap-6 p-6 bg-rc-navy-light rounded-lg border border-rc-border hover:border-rc-accent transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-full border-2 border-rc-border flex items-center justify-center font-bold text-sm text-rc-text group-hover:border-rc-accent group-hover:text-rc-accent transition-all flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="font-bold text-rc-text text-base group-hover:text-rc-accent transition-colors">{stage.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
