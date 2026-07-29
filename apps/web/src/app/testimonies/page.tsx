export default function TestimoniesPage() {
  const testimonies = [
    { id: 1, name: 'Samuel', stage: 'Honest Work', image: '👨', quote: 'Brother Jimi prayed with me. I met Jesus. Everything changed.', story: 'Samuel had money from fraud. Lots of it. A car. Respect. But he was empty inside. His cousin told him about Brother Jimi. Samuel called. During prayer, he felt God. Real. Present. Not like a story. Real. He cried. The next week he left fraud. Now he works a normal job. Makes way less money. But he is free. His mom says she has her son back.' },
    { id: 2, name: 'Zainab', stage: 'Service', image: '👩', quote: 'Brother Jimi brought me to Jesus. Jesus changed everything.', story: 'Zainab was lonely and broke. She scammed people to make money. For three years. She was good at it. Then she broke. Her friend who knows Brother Jimi reached out: Come pray with him. Zainab went. When Brother Jimi prayed, the Holy Spirit came. She felt forgiven. Really forgiven. Not just words. Forgiveness. Now she helps other people leave fraud. She has walked two people out. She does it because Jesus saved her.' },
    { id: 3, name: 'James', stage: 'Honest Work', image: '👨', quote: 'I did wrong. Brother Jimi showed me Jesus still loves me.', story: 'James was in prison for fraud. Two years. He got out hard. Angry. A chaplain told him about Brother Jimi. James did not care. But he called. Brother Jimi prayed with him. James felt Jesus love him. Not judgment. Love. Something broke open inside. Now James works. Honest work. His daughter asked him if he was proud of his job. He said: Yes. I am proud because it is honest. He never thought he would say that.' },
    { id: 4, name: 'Blessing', stage: 'Honest Work', image: '👩', quote: 'I had money but I was scared all the time. Jesus gave me peace.', story: 'Blessing made money from fraud. Lots. Private school for her kids. Nice car. But she could not sleep. She was scared every day. Scared she would get caught. Her sister told her about Brother Jimi Skool. Blessing went. Through the 7 weeks, she met Jesus. She realized: the money is not worth the fear. She left. Now she works teaching. Makes way less money. But she sleeps. Her kids are happy. She is happy. That is worth everything.' }
  ];

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 48px' }}>
        <div style={{ maxWidth: '720px', marginBottom: '48px' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#0D5E57', margin: '0 0 12px' }}>Real Stories</p>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 16px', color: '#1A1A18', fontFamily: 'Georgia, serif', lineHeight: 1.1 }}>What Jesus Did</h1>
          <p style={{ fontSize: '1.125rem', color: '#7A7A78', lineHeight: 1.8, margin: 0 }}>People who met Jesus through Brother Jimi prayer. Their lives are different now.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {testimonies.map((t) => (
            <div key={t.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', border: '1px solid #E8E8E6' }}>
              <div style={{ fontSize: '3rem', marginBottom: '24px' }}>{t.image}</div>
              <blockquote style={{ fontSize: '1.125rem', fontWeight: 500, color: '#1A1A18', margin: '0 0 20px', lineHeight: 1.6, fontStyle: 'italic', borderLeft: '4px solid #0D5E57', paddingLeft: '16px' }}>
                {t.quote}
              </blockquote>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1A1A18', margin: 0 }}>{t.name}</p>
                <p style={{ fontSize: '0.875rem', color: '#0D5E57', fontWeight: 600, margin: '4px 0 0' }}>{t.stage}</p>
              </div>
              <p style={{ fontSize: '0.9375rem', color: '#7A7A78', lineHeight: 1.7, margin: 0 }}>{t.story}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#0D5E57', color: '#ffffff', padding: '64px 24px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 16px', fontFamily: 'Georgia, serif', lineHeight: 1.2 }}>Help more people meet Jesus</h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: '0 0 32px', lineHeight: 1.8 }}>Brother Jimi brings people to Jesus through prayer. Everything you read happened because someone supported this work. Will you help more people find freedom?</p>
          <a href="mailto:james@saintandstory.co.uk" style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: '#ffffff', color: '#0D5E57', fontSize: '1rem', fontWeight: 600, borderRadius: '8px', textDecoration: 'none', cursor: 'pointer' }}>Support This Work</a>
        </div>
      </div>
    </div>
  );
}
