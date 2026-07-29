'use client';

export default function TestimoniesPage() {
  const testimonies = [
    { id: 1, name: 'Samuel', stage: '6', stageLabel: 'Honest Work', image: '👨', quote: 'Brother Jimi prayed with me. I met Jesus. Everything changed.', story: 'Samuel had money from fraud. Lots of it. A car. Respect. But he was empty inside. His cousin told him about Brother Jimi. Samuel called. During prayer, he felt God. Real. Present. Not like a story. Real. He cried. The next week he left fraud. Now he works a normal job. Makes way less money. But he is free. His mom says she has her son back.' },
    { id: 2, name: 'Zainab', stage: '7', stageLabel: 'Service', image: '👩', quote: 'Brother Jimi brought me to Jesus. Jesus changed everything.', story: 'Zainab was lonely and broke. She scammed people to make money. For three years. She was good at it. Then she broke. Her friend who knows Brother Jimi reached out: Come pray with him. Zainab went. When Brother Jimi prayed, the Holy Spirit came. She felt forgiven. Really forgiven. Not just words. Forgiveness. Now she helps other people leave fraud. She has walked two people out. She does it because Jesus saved her.' },
    { id: 3, name: 'James', stage: '6', stageLabel: 'Honest Work', image: '👨', quote: 'I did wrong. Brother Jimi showed me Jesus still loves me.', story: 'James was in prison for fraud. Two years. He got out hard. Angry. A chaplain told him about Brother Jimi. James did not care. But he called. Brother Jimi prayed with him. James felt Jesus love him. Not judgment. Love. Something broke open inside. Now James works. Honest work. His daughter asked him if he was proud of his job. He said: Yes. I am proud because it is honest. He never thought he would say that.' },
    { id: 4, name: 'Blessing', stage: '6', stageLabel: 'Honest Work', image: '👩', quote: 'I had money but I was scared all the time. Jesus gave me peace.', story: 'Blessing made money from fraud. Lots. Private school for her kids. Nice car. But she could not sleep. She was scared every day. Scared she would get caught. Her sister told her about Brother Jimi Skool. Blessing went. Through the 7 weeks, she met Jesus. She realized: the money is not worth the fear. She left. Now she works teaching. Makes way less money. But she sleeps. Her kids are happy. She is happy. That is worth everything.' }
  ];

  return (
    <div className="bg-white text-rc-text">
      {/* Hero */}
      <section className="w-full py-24 md:py-40 px-6 sm:px-8 md:px-12 bg-white">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-sm font-medium text-rc-accent uppercase tracking-wider">Real Stories</p>
          <h1 className="text-5xl md:text-6xl font-rc-serif font-bold text-rc-text leading-tight">Lives Changed</h1>
          <p className="text-lg md:text-xl text-rc-text/70 leading-relaxed pt-4">People who met Jesus through Brother Jimi prayer. Their lives are different now.</p>
        </div>
      </section>

      {/* Testimonials - One per section with breathing room */}
      <div className="bg-white">
        {testimonies.map((t) => (
          <section key={t.id} className="w-full py-32 md:py-40 px-6 sm:px-8 md:px-12 border-t border-rc-border/20">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8 md:space-y-12">
                {/* Avatar */}
                <div className="text-6xl">{t.image}</div>

                {/* Quote - Large and bold */}
                <blockquote className="space-y-6">
                  <p className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Name and Stage */}
                <div className="space-y-2">
                  <p className="text-lg font-medium text-rc-text">{t.name}</p>
                  <p className="text-sm font-medium text-rc-accent uppercase tracking-wide">Stage {t.stage} — {t.stageLabel}</p>
                </div>

                {/* Full Story */}
                <div className="space-y-6 pt-4">
                  <p className="text-lg text-rc-text/80 leading-relaxed font-light">
                    {t.story}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="w-full py-24 md:py-40 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-rc-serif font-bold text-white leading-tight">
            Help more people meet Jesus
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">
            Everything you read happened because someone supported this work. Will you help more people find freedom?
          </p>
          <div className="pt-4">
            <a href="mailto:james@saintandstory.co.uk" className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:shadow-lg transition-all duration-200">
              Support This Work
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <p className="text-white/60 text-sm">Brother Jimi Ministries — An Inspiration from Jesus Christ</p>
          <p className="text-white/30 text-xs">© 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
