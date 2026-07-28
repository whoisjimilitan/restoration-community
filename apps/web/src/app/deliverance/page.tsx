'use client';

import AutoOpenDeliveranceModal from '@/components/AutoOpenDeliveranceModal';

export default function DeliverancePage() {
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      overflow: 'hidden'
    }}>
      {/* Warm background with subtle breathing effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: `
          linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,250,245,0.6) 50%, rgba(240,254,253,0.3) 100%),
          radial-gradient(ellipse 900px 500px at 50% 50%, rgba(13,94,87,0.02) 0%, transparent 60%)
        `,
        pointerEvents: 'none'
      }} />

      {/* Subtle silhouette figures at edges—suggest human presence without competing */}
      {/* Left figure silhouette */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '120px',
        height: '240px',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: 'rgba(180, 220, 215, 0.08)',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(1px)'
      }} />
      {/* Right figure silhouette */}
      <div style={{
        position: 'absolute',
        bottom: '12%',
        right: '6%',
        width: '110px',
        height: '235px',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: 'rgba(180, 220, 215, 0.07)',
        opacity: 0.5,
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(1px)'
      }} />
      {/* Center-back subtle figure */}
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: '220px',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: 'rgba(180, 220, 215, 0.05)',
        opacity: 0.4,
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(1.5px)'
      }} />

      {/* Subtle cross symbol—focal point */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.06,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <svg width="450" height="450" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="10" x2="50" y2="90" stroke="#0D5E57" strokeWidth="2.5"/>
          <line x1="10" y1="50" x2="90" y2="50" stroke="#0D5E57" strokeWidth="2.5"/>
        </svg>
      </div>

      {/* Soft radial gradient breathing effect */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,240,230,0.3) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        left: '-8%',
        width: '320px',
        height: '320px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(240,254,253,0.2) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Center message */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontWeight: 700,
          color: '#0D5E57',
          lineHeight: 1.4,
          marginBottom: '1rem',
          marginTop: 0,
          letterSpacing: '0.05em'
        }}>
          JESUS DELIVERS
        </h1>

        <p style={{
          fontSize: '1rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#666666',
          lineHeight: 1.6,
          marginTop: 0,
          maxWidth: '400px'
        }}>
          Jesus Christ is your ultimate deliverer. Your journey toward freedom begins here.
        </p>
      </div>

      {/* Auto-open modal after delay */}
      <AutoOpenDeliveranceModal delayMs={1200} />
    </div>
  );
}
