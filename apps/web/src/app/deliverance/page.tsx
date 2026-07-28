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

      {/* Prayer meditation illustration watermark */}
      <svg
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          opacity: 0.08,
          pointerEvents: 'none',
          zIndex: 0
        }}
        viewBox="0 0 400 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Water/horizon */}
        <path d="M 0 320 Q 100 310 200 320 T 400 320 L 400 500 L 0 500 Z" fill="rgba(13, 94, 87, 0.3)" />
        <path d="M 0 320 Q 100 310 200 320 T 400 320" stroke="rgba(13, 94, 87, 0.4)" strokeWidth="2" fill="none" />

        {/* Rock formations */}
        <path d="M 80 280 L 120 350 L 60 380 L 40 320 Z" fill="rgba(26, 26, 24, 0.4)" stroke="rgba(26, 26, 24, 0.5)" strokeWidth="1.5" />
        <path d="M 120 260 L 180 330 L 140 400 L 100 310 Z" fill="rgba(26, 26, 24, 0.35)" stroke="rgba(26, 26, 24, 0.45)" strokeWidth="1.5" />
        <path d="M 200 240 L 280 320 L 240 420 L 160 300 Z" fill="rgba(26, 26, 24, 0.4)" stroke="rgba(26, 26, 24, 0.5)" strokeWidth="1.5" />
        <path d="M 280 270 L 340 340 L 310 410 L 260 330 Z" fill="rgba(26, 26, 24, 0.32)" stroke="rgba(26, 26, 24, 0.45)" strokeWidth="1.5" />

        {/* Figure in prayer - sitting on rocks */}
        {/* Head */}
        <circle cx="180" cy="180" r="22" fill="rgba(26, 26, 24, 0.5)" />

        {/* Shoulders and torso */}
        <path d="M 160 205 Q 160 250 180 280 Q 200 250 200 205" fill="rgba(26, 26, 24, 0.45)" stroke="rgba(26, 26, 24, 0.5)" strokeWidth="1.5" />

        {/* Arms in prayer position */}
        <path d="M 175 220 Q 170 240 175 260" stroke="rgba(26, 26, 24, 0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 185 220 Q 190 240 185 260" stroke="rgba(26, 26, 24, 0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Hands together */}
        <path d="M 175 258 L 185 265 L 185 258 Z" fill="rgba(26, 26, 24, 0.5)" />

        {/* Legs folded */}
        <path d="M 165 280 Q 155 310 160 330" stroke="rgba(26, 26, 24, 0.45)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 195 280 Q 205 310 200 330" stroke="rgba(26, 26, 24, 0.45)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Tree branch overhead */}
        <path d="M 20 80 Q 100 60 200 100 Q 280 140 340 120" stroke="rgba(26, 26, 24, 0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 60 80 Q 80 50 100 70" stroke="rgba(26, 26, 24, 0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 240 90 Q 270 70 290 100" stroke="rgba(26, 26, 24, 0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Distant landscape elements */}
        <path d="M 0 160 Q 50 140 100 160" stroke="rgba(13, 94, 87, 0.2)" strokeWidth="1.5" fill="none" />
        <path d="M 300 150 Q 340 135 400 155" stroke="rgba(13, 94, 87, 0.2)" strokeWidth="1.5" fill="none" />
      </svg>

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
          You don&apos;t have to live this way anymore.
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
