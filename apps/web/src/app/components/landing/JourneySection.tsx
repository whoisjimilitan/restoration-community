'use client';

const stages = [
  { name: 'Truth', color: '#E8F4F3' },
  { name: 'Confession', color: '#D1EEEA' },
  { name: 'Repentance', color: '#B3E5E0' },
  { name: 'Forgiveness', color: '#95DDD7' },
  { name: 'Reconciliation', color: '#4DB5A6' },
  { name: 'Honest Work', color: '#1B7A6F' },
  { name: 'Serving', color: '#0D5E57' },
];

const getStageColor = (index: number) => {
  const colors = ['#E8F4F3', '#D1EEEA', '#B3E5E0', '#95DDD7', '#4DB5A6', '#1B7A6F', '#0D5E57'];
  return colors[index] || '#0D5E57';
};

const getTextColor = (index: number) => {
  return index >= 5 ? 'text-white' : 'text-rc-text';
};

export default function JourneySection() {
  return (
    <section id="journey" className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-text/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="space-y-16">
          {/* Heading */}
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              The J<span className="italic">o</span>urney of Truth
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
                    <div
                      key={index}
                      className="flex flex-col items-center group"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 group-hover:shadow-lg group-hover:scale-110"
                        style={{
                          backgroundColor: getStageColor(index),
                          color: getTextColor(index)
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-sm font-medium text-rc-text">
                          {stage.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden">
              <div className="space-y-4">
                {stages.map((stage, index) => (
                  <div
                    key={index}
                    className="w-full text-left p-4 border border-rc-text/10 rounded-lg transition-all duration-200 group hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-200"
                        style={{
                          backgroundColor: getStageColor(index),
                          color: getTextColor(index)
                        }}
                      >
                        {index + 1}
                      </div>
                      <p className="font-medium text-rc-text">{stage.name}</p>
                    </div>
                  </div>
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
