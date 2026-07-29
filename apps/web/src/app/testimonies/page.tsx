'use client';

export default function TestimoniesPage() {
  const testimonies = [
    { id: 1, name: 'Samuel', stage: 'Honest Work', image: '👨', quote: 'Brother Jimi prayed with me. I met Jesus. Everything changed.', story: 'Samuel had money from fraud. Lots of it. A car. Respect. But he was empty inside. His cousin told him about Brother Jimi. Samuel called. During prayer, he felt God. Real. Present. Not like a story. Real. He cried. The next week he left fraud. Now he works a normal job. Makes way less money. But he is free. His mom says she has her son back.' },
    { id: 2, name: 'Zainab', stage: 'Service', image: '👩', quote: 'Brother Jimi brought me to Jesus. Jesus changed everything.', story: 'Zainab was lonely and broke. She scammed people to make money. For three years. She was good at it. Then she broke. Her friend who knows Brother Jimi reached out: Come pray with him. Zainab went. When Brother Jimi prayed, the Holy Spirit came. She felt forgiven. Really forgiven. Not just words. Forgiveness. Now she helps other people leave fraud. She has walked two people out. She does it because Jesus saved her.' },
    { id: 3, name: 'James', stage: 'Honest Work', image: '👨', quote: 'I did wrong. Brother Jimi showed me Jesus still loves me.', story: 'James was in prison for fraud. Two years. He got out hard. Angry. A chaplain told him about Brother Jimi. James did not care. But he called. Brother Jimi prayed with him. James felt Jesus love him. Not judgment. Love. Something broke open inside. Now James works. Honest work. His daughter asked him if he was proud of his job. He said: Yes. I am proud because it is honest. He never thought he would say that.' },
    { id: 4, name: 'Blessing', stage: 'Honest Work', image: '👩', quote: 'I had money but I was scared all the time. Jesus gave me peace.', story: 'Blessing made money from fraud. Lots. Private school for her kids. Nice car. But she could not sleep. She was scared every day. Scared she would get caught. Her sister told her about Brother Jimi Skool. Blessing went. Through the 7 weeks, she met Jesus. She realized: the money is not worth the fear. She left. Now she works teaching. Makes way less money. But she sleeps. Her kids are happy. She is happy. That is worth everything.' }
  ];

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* Hero */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 border-b border-rc-border">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <p className="text-xs font-medium text-rc-accent uppercase tracking-wider mb-4">Real Stories</p>
            <h1 className="text-4xl md:text-5xl font-rc-serif font-bold text-rc-text leading-tight mb-6">What Jesus Did</h1>
            <p className="text-base md:text-lg text-rc-text/80 leading-relaxed">People who met Jesus through Brother Jimi prayer. Their lives are different now.</p>
          </div>
        </div>
      </section>

      {/* Testimonies Grid */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-b border-rc-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {testimonies.map((t) => (
              <div key={t.id} className="bg-white rounded-lg p-8 md:p-10 border border-rc-border">
                <div className="text-4xl mb-6">{t.image}</div>
                <blockquote className="text-base md:text-lg font-medium text-rc-text mb-6 leading-relaxed border-l-4 border-rc-accent pl-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mb-6">
                  <p className="text-base font-medium text-rc-text">{t.name}</p>
                  <p className="text-sm text-rc-accent font-medium mt-1">Stage {t.stage === 'Honest Work' ? '6' : '7'} — {t.stage}</p>
                </div>
                <p className="text-sm md:text-base text-rc-text/70 leading-relaxed">{t.story}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-28 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-rc-serif font-bold text-white leading-tight mb-6">Help more people meet Jesus</h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">Brother Jimi brings people to Jesus through prayer. Everything you read happened because someone supported this work. Will you help more people find freedom?</p>
          </div>
          <div>
            <a href="mailto:james@saintandstory.co.uk" className="inline-flex items-center justify-center px-8 py-3 min-h-[48px] bg-white text-rc-accent font-medium rounded-lg hover:shadow-lg transition-all duration-200">
              Support This Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
