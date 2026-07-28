'use client';

import AutoOpenDeliveranceModal from '@/components/AutoOpenDeliveranceModal';

export default function DeliverancePage() {
  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: '#FAFAF8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      paddingTop: '4rem',
      paddingBottom: '4rem',
      overflow: 'hidden'
    }}>
      {/* Elegant background gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        background: `
          linear-gradient(135deg, rgba(250,250,248,1) 0%, rgba(255,250,245,0.4) 50%, rgba(240,254,253,0.2) 100%),
          radial-gradient(ellipse 900px 500px at 50% 50%, rgba(13,94,87,0.015) 0%, transparent 60%)
        `,
        pointerEvents: 'none'
      }} />

      {/* Subtle silhouette figures at edges—suggest human presence without competing */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '120px',
        height: '240px',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: 'rgba(180, 220, 215, 0.06)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(1px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '12%',
        right: '6%',
        width: '110px',
        height: '235px',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: 'rgba(180, 220, 215, 0.05)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(1px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: '220px',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        background: 'rgba(180, 220, 215, 0.03)',
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
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <svg width="500" height="500" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
        background: 'radial-gradient(circle, rgba(255,240,230,0.2) 0%, transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(240,254,253,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Center message - Premium typography */}
      <div style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        maxWidth: '600px'
      }}>
        {/* Main heading with serif and italic vowels */}
        <h1 style={{
          fontSize: '3.25rem',
          fontFamily: 'Georgia, Garamond, serif',
          fontWeight: 700,
          color: '#1a1a1a',
          lineHeight: 1.2,
          marginBottom: '1.25rem',
          marginTop: 0,
          letterSpacing: '-0.02em'
        }}>
          J<span style={{ fontStyle: 'italic' }}>e</span>sus D<span style={{ fontStyle: 'italic' }}>e</span>liv<span style={{ fontStyle: 'italic' }}>e</span>rs
        </h1>

        {/* Subheading - compelling message */}
        <p style={{
          fontSize: '1.25rem',
          fontFamily: 'Georgia, Garamond, serif',
          color: '#0D5E57',
          lineHeight: 1.6,
          marginTop: 0,
          marginBottom: '1.5rem',
          fontWeight: 500,
          fontStyle: 'italic'
        }}>
          You don't have to live this way anymore.
        </p>

        {/* Description - warm, personal tone */}
        <p style={{
          fontSize: '1.0625rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#666666',
          lineHeight: 1.8,
          marginTop: 0,
          marginBottom: 0
        }}>
          J<span style={{ fontStyle: 'italic' }}>e</span>sus Christ off<span style={{ fontStyle: 'italic' }}>e</span>rs tr<span style={{ fontStyle: 'italic' }}>u</span>e fr<span style={{ fontStyle: 'italic' }}>e</span>edom from d<span style={{ fontStyle: 'italic' }}>e</span>c<span style={{ fontStyle: 'italic' }}>e</span>ption, r<span style={{ fontStyle: 'italic' }}>e</span>storation of id<span style={{ fontStyle: 'italic' }}>e</span>ntity, and a lif<span style={{ fontStyle: 'italic' }}>e</span> that actually matt<span style={{ fontStyle: 'italic' }}>e</span>rs.
        </p>

        {/* Call to action text */}
        <p style={{
          fontSize: '0.9375rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#0D5E57',
          lineHeight: 1.7,
          marginTop: '2rem',
          marginBottom: 0,
          fontWeight: 500,
          letterSpacing: '0.5px',
          textTransform: 'uppercase'
        }}>
          Your journey begins below.
        </p>
      </div>

      {/* Auto-open modal after delay */}
      <AutoOpenDeliveranceModal delayMs={1200} />
    </div>
  );
}
