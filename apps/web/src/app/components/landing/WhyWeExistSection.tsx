'use client';

export default function WhyWeExistSection() {
  return (
    <section style={{
      backgroundColor: '#F8F6F2',
      paddingTop: '4rem',
      paddingBottom: '4rem',
      paddingLeft: '2rem',
      paddingRight: '2rem'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.25rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#202124',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          marginBottom: '1.5rem',
          marginTop: 0
        }}>
          Why We Exist
        </h2>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#202124',
          lineHeight: 1.7,
          letterSpacing: '-0.005em',
          marginBottom: '1.25rem',
          marginTop: 0
        }}>
          We exist because no one should have to rebuild their life alone.
        </p>

        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          color: '#202124',
          lineHeight: 1.7,
          letterSpacing: '-0.005em',
          marginBottom: 0,
          marginTop: 0
        }}>
          The Restoration Community is a peer support space for people leaving cybercrime and pursuing honest work and living through Jesus Christ.
        </p>
      </div>
    </section>
  );
}
