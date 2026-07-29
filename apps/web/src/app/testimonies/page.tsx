export default function TestimoniesPage() {
  const testimonies = [
    {
      id: 1,
      name: 'Samuel',
      stage: 'Honest Work',
      image: '👨',
      quote: 'I learned that honest work builds dignity. Jesus gave me purpose again.',
      story: 'After leaving fraud, Samuel rebuilt his life through legitimate employment. He now mentors others in his community, showing them that transformation is real and lasting.'
    },
    {
      id: 2,
      name: 'Zainab',
      stage: 'Service',
      image: '👩',
      quote: 'My restored life is now my witness. Helping others find freedom is my calling.',
      story: 'Zainab completed the 7-stage restoration journey and now serves as a mentor, walking alongside others. Her testimony has helped 5 others find Jesus.'
    },
    {
      id: 3,
      name: 'James',
      stage: 'Honest Work',
      image: '👨',
      quote: 'Jesus did not just set me free from fraud. He set me free to live with purpose.',
      story: 'James now runs his own legitimate business and is rebuilding relationships he damaged through fraud. His family sees the real change in him and they are slowly restoring trust.'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 48px' }}>
        <div style={{ maxWidth: '720px', marginBottom: '48px' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#0D5E57', margin: '0 0 12px' }}>Real Transformation</p>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 16px', color: '#1A1A18', fontFamily: 'Georgia, serif', lineHeight: 1.1 }}>Testimonies</h1>
          <p style={{ fontSize: '1.125rem', color: '#7A7A78', lineHeight: 1.8, margin: 0 }}>Meet people who found freedom through Jesus Christ. Their stories show what transformation looks like when the gospel is lived out in community.</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {testimonies.map((t) => (
            <div key={t.id} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', border: '1px solid #E8E8E6' }}>
              <div style={{ fontSize: '3rem', marginBottom: '24px' }}>{t.image}</div>
              <blockquote style={{ fontSize: '1.25rem', fontWeight: 500, color: '#1A1A18', margin: '0 0 20px', lineHeight: 1.6, fontStyle: 'italic', borderLeft: '4px solid #0D5E57', paddingLeft: '16px' }}>
                {t.quote}
              </blockquote>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: '#1A1A18', margin: 0 }}>{t.name}</p>
                <p style={{ fontSize: '0.875rem', color: '#0D5E57', fontWeight: 600, margin: '4px 0 0' }}>Stage 6 - {t.stage}</p>
              </div>
              <p style={{ fontSize: '0.9375rem', color: '#7A7A78', lineHeight: 1.7, margin: 0 }}>{t.story}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#0D5E57', color: '#ffffff', padding: '64px 24px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 16px', fontFamily: 'Georgia, serif', lineHeight: 1.2 }}>Help us reach more people</h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: '0 0 32px', lineHeight: 1.8 }}>Every testimony costs something - Brother Jimi time, prayer, and faithful care. Partner with us to help more find freedom through Jesus Christ.</p>
          <a href="/partnership" style={{ display: 'inline-block', padding: '14px 32px', backgroundColor: '#ffffff', color: '#0D5E57', fontSize: '1rem', fontWeight: 600, borderRadius: '8px', textDecoration: 'none' }}>Become a Partner</a>
        </div>
      </div>
    </div>
  );
}
