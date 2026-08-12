import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Journey - Brother Jimi',
  description: 'Walk through the 7 stages of spiritual restoration.',
};

const stages = [
  { number: 1, name: 'Truth', description: 'See yourself clearly and Jesus clearly' },
  { number: 2, name: 'Confession', description: 'Speak it aloud to God' },
  { number: 3, name: 'Repentance', description: 'Turn away from what harmed you' },
  { number: 4, name: 'Forgiveness', description: 'Release what held you captive' },
  { number: 5, name: 'Reconciliation', description: 'Restore what was broken' },
  { number: 6, name: 'Honest Work', description: 'Build a life that reflects who you are' },
  { number: 7, name: 'Serving', description: 'Give to others what you received' },
];

export default function JourneyPage() {
  return (
    <div className="bg-rc-bg text-rc-text min-h-screen">
      <section className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-br from-rc-accent to-rc-text px-6 sm:px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto w-full space-y-6">
          <div>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider">Your Restoration</p>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight tracking-tight">
              The 7-Stage Journey
            </h1>
          </div>

          <div>
            <div className="space-y-4 text-base md:text-lg text-white/90 leading-relaxed font-light">
              <p>Welcome to your restoration journey.</p>
              <p className="pt-2">Here is where Jesus Christ continues the work that began at the gathering.</p>
            </div>
          </div>

          <div className="pt-12 space-y-4 border-t border-white/20">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white/70">Stages</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {stages.map((stage) => (
                  <div
                    key={stage.number}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-xs md:text-sm font-semibold bg-white/20 text-white"
                  >
                    {stage.number}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border/30">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-text leading-tight tracking-tight">
              The Seven Stages
            </h2>
          </div>

          <div className="grid gap-6">
            {stages.map((stage) => (
              <div key={stage.number} className="border-l-4 border-rc-accent pl-4">
                <h3 className="text-lg font-semibold text-rc-text">{stage.name}</h3>
                <p className="text-rc-text/70 text-sm mt-1">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="w-full px-6 sm:px-8 md:px-12 py-8 bg-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 flex-wrap">
            <a href="/" className="text-white/80 hover:text-white transition-colors group text-sm">
              Home
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/stories" className="text-white/80 hover:text-white transition-colors group text-sm">
              Stories
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/gathering" className="text-white/80 hover:text-white transition-colors group text-sm">
              Gathering
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
            <a href="/journey" className="text-white/80 hover:text-white transition-colors group text-sm">
              Journey
              <span className="block h-px w-0 group-hover:w-full bg-white transition-all duration-300 mt-1"></span>
            </a>
          </div>
          <p className="text-white/40 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
