'use client';

import { useState } from 'react';
import Link from 'next/link';
import AutoOpenModal from '@/components/AutoOpenModal';
import ProgressiveDeliveranceModal from '@/components/ProgressiveDeliveranceModal';

export default function DeliverancePage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '2rem', paddingRight: '2rem', backgroundColor: '#FAFAF8' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontFamily: 'Georgia, Garamond, serif',
            fontWeight: 700,
            color: '#202124',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            marginTop: 0
          }}>
            Your First St<span style={{ fontStyle: 'italic' }}>e</span>p Has B<span style={{ fontStyle: 'italic' }}>e</span><span style={{ fontStyle: 'italic' }}>e</span>n Tak<span style={{ fontStyle: 'italic' }}>e</span>n
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#202124',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
            marginTop: 0
          }}>
            Thank you for op<span style={{ fontStyle: 'italic' }}>e</span>ning your h<span style={{ fontStyle: 'italic' }}>e</span>art.
          </p>

          <p style={{
            fontSize: '1.0625rem',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            color: '#202124',
            lineHeight: 1.7,
            marginBottom: '2rem',
            marginTop: 0
          }}>
            Your r<span style={{ fontStyle: 'italic' }}>e</span>qu<span style={{ fontStyle: 'italic' }}>e</span>st has b<span style={{ fontStyle: 'italic' }}>e</span>en r<span style={{ fontStyle: 'italic' }}>e</span>c<span style={{ fontStyle: 'italic' }}>e</span>iv<span style={{ fontStyle: 'italic' }}>e</span>d. Som<span style={{ fontStyle: 'italic' }}>e</span>on<span style={{ fontStyle: 'italic' }}>e</span> from th<span style={{ fontStyle: 'italic' }}>e</span> ministry will r<span style={{ fontStyle: 'italic' }}>e</span>ach out to you r<span style={{ fontStyle: 'italic' }}>e</span>garding th<span style={{ fontStyle: 'italic' }}>e</span> n<span style={{ fontStyle: 'italic' }}>e</span>xt st<span style={{ fontStyle: 'italic' }}>e</span>p toward pray<span style={{ fontStyle: 'italic' }}>e</span>r and your <span style={{ fontStyle: 'italic' }}>e</span>ncount<span style={{ fontStyle: 'italic' }}>e</span>r with J<span style={{ fontStyle: 'italic' }}>e</span>sus Christ.
          </p>

          <div style={{ backgroundColor: '#F8F6F2', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontFamily: 'Georgia, Garamond, serif',
              fontWeight: 700,
              color: '#202124',
              marginBottom: '1rem',
              marginTop: 0
            }}>
              What Happ<span style={{ fontStyle: 'italic' }}>e</span>ns N<span style={{ fontStyle: 'italic' }}>e</span>xt
            </h2>

            <p style={{
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              lineHeight: 1.6,
              marginBottom: '1rem',
              marginTop: 0
            }}>
              A ministry l<span style={{ fontStyle: 'italic' }}>e</span>ad<span style={{ fontStyle: 'italic' }}>e</span>r will contact you within 24-48 hours to discuss th<span style={{ fontStyle: 'italic' }}>e</span> n<span style={{ fontStyle: 'italic' }}>e</span>xt st<span style={{ fontStyle: 'italic' }}>e</span>p toward pray<span style={{ fontStyle: 'italic' }}>e</span>r and your <span style={{ fontStyle: 'italic' }}>e</span>ncount<span style={{ fontStyle: 'italic' }}>e</span>r with J<span style={{ fontStyle: 'italic' }}>e</span>sus Christ.
            </p>

            <p style={{
              fontSize: '1rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
              color: '#202124',
              lineHeight: 1.6,
              marginBottom: 0,
              marginTop: 0,
              fontStyle: 'italic'
            }}>
              R<span style={{ fontStyle: 'italic' }}>e</span>m<span style={{ fontStyle: 'italic' }}>e</span>mb<span style={{ fontStyle: 'italic' }}>e</span>r: your past do<span style={{ fontStyle: 'italic' }}>e</span>s not hav<span style={{ fontStyle: 'italic' }}>e</span> to d<span style={{ fontStyle: 'italic' }}>e</span>fin<span style={{ fontStyle: 'italic' }}>e</span> your futur<span style={{ fontStyle: 'italic' }}>e</span>. Through J<span style={{ fontStyle: 'italic' }}>e</span>sus Christ, a n<span style={{ fontStyle: 'italic' }}>e</span>w lif<span style={{ fontStyle: 'italic' }}>e</span> is possibl<span style={{ fontStyle: 'italic' }}>e</span>.
            </p>
          </div>

          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.875rem 1.75rem',
              backgroundColor: 'transparent',
              color: '#0D5E57',
              fontSize: '0.9375rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid rgba(13, 94, 87, 0.3)',
              borderRadius: '0.375rem',
              fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#202124';
              e.currentTarget.style.borderColor = '#202124';
              e.currentTarget.style.backgroundColor = 'rgba(13, 94, 87, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#0D5E57';
              e.currentTarget.style.borderColor = 'rgba(13, 94, 87, 0.3)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            R<span style={{ fontStyle: 'italic' }}>e</span>turn Hom<span style={{ fontStyle: 'italic' }}>e</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      background: 'linear-gradient(135deg, #ffffff 0%, #f0fffe 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      overflow: 'hidden'
    }}>
      {/* Subtle cross/light symbol in center background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.05,
        pointerEvents: 'none'
      }}>
        <svg width="300" height="300" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="20" x2="50" y2="80" stroke="#0D5E57" strokeWidth="2"/>
          <line x1="20" y1="50" x2="80" y2="50" stroke="#0D5E57" strokeWidth="2"/>
        </svg>
      </div>

      {/* Center message */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
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
          fontSize: '0.9375rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#666666',
          lineHeight: 1.6,
          marginTop: 0,
          maxWidth: '400px'
        }}>
          Jesus Christ is your ultimate deliverer. Your journey toward freedom begins here.
        </p>
      </div>

      <AutoOpenModal delayMs={1200}>
        <ProgressiveDeliveranceModal />
      </AutoOpenModal>
    </div>
  );
}
