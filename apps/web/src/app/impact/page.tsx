export default function ImpactPage() {
  const metrics = [
    { label: 'People Prayed With', value: '15', description: 'Encountering Jesus through prayer' },
    { label: 'In Restoration', value: '15', description: 'Walking the 7-stage journey' },
    { label: 'In Honest Work', value: '0', description: 'Stage 6 - Building with integrity' },
    { label: 'Serving Others', value: '0', description: 'Stage 7 - Helping others find freedom' },
  ];

  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 48px' }}>
        <div style={{ maxWidth: '720px', marginBottom: '64px' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#0D5E57', margin: '0 0 12px' }}>What We are Building</p>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, margin: '0 0 16px', color: '#1A1A18', fontFamily: 'Georgia, serif', lineHeight: 1.1 }}>Our Impact</h1>
          <p style={{ fontSize: '1.125rem', color: '#7A7A78', lineHeight: 1.8, margin: 0 }}>Real numbers. Real people. Real transformation through Jesus Christ.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', border: '1px solid #E8E8E6' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#7A7A78', margin: '0 0 12px' }}>{m.label}</p>
              <p style={{ fontSize: '3rem', fontWeight: 700, color: '#0D5E57', margin: '0 0 16px', fontFamily: 'Georgia, serif' }}>{m.value}</p>
              <p style={{ fontSize: '0.9375rem', color: '#7A7A78', margin: 0, lineHeight: 1.6 }}>{m.description}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#E8F4F3', borderRadius: '16px', padding: '48px', border: '2px solid #0D5E57', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 16px', color: '#1A1A18', fontFamily: 'Georgia, serif' }}>Partner With Us</h2>
          <p style={{ fontSize: '1.125rem', color: '#7A7A78', margin: '0 0 32px', lineHeight: 1.8 }}>All transformation is completely free. We are funded by partners who believe in this work.</p>
          <a href="mailto:james@saintandstory.co.uk" style={{ display: 'inline-block', padding: '14px 40px', backgroundColor: '#0D5E57', color: '#ffffff', fontSize: '1rem', fontWeight: 600, borderRadius: '8px', textDecoration: 'none' }}>Become a Sponsor</a>
        </div>
      </div>
    </div>
  );
}
