'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
  }

  return (
    <main style={{ backgroundColor'var(--bg-primary)' }}>
      {/* Hero Section */}
      <section className="hero">
        <div className="container-max">
          {/* Bible Image Placeholder */}
          <div
            style={{
              marginBottom'var(--spacing-5xl)',
              width'100%',
              maxWidth'600px',
              margin'0 auto var(--spacing-5xl)',
              aspectRatio'1',
              background'linear-gradient(180deg, var(--color-gray-light) 0%, var(--color-off-white) 100%)',
              borderRadius'var(--radius-lg)',
              display'flex',
              flexDirection'column',
              alignItems'center',
              justifyContent'center',
              padding'var(--spacing-4xl)',
              textAlign'center',
              position'relative',
            }}
          >
            <div
              style={{
                position'absolute',
                inset0,
                borderRadius'var(--radius-lg)',
                background'linear-gradient(180deg, rgba(29, 29, 31, 0.05) 0%, rgba(29, 29, 31, 0.1) 100%)',
              }}
            />
            <div style={{ position'relative', zIndex10 }}>
              <div
                style={{
                  color'var(--color-accent)',
                  fontSize'var(--text-label)',
                  fontWeight'var(--weight-semibold)',
                  marginBottom'var(--spacing-2xl)',
                  letterSpacing'var(--tracking-loose)',
                }}
              >
                John 10:10
              </div>
              <p
                style={{
                  fontFamily'var(--font-serif)',
                  fontSize'var(--text-body-lg)',
                  lineHeight'var(--leading-relaxed)',
                  color'var(--text-primary)',
                  marginBottom'var(--spacing-3xl)',
                  maxWidth'400px',
                }}
              >
                "I have come that they may have life, and have it to the full."
              </p>
              <p
                style={{
                  fontSize'var(--text-label)',
                  color'var(--text-secondary)',
                }}
              >
                Hands holding Bible
              </p>
            </div>
          </div>

          {/* Hero Heading */}
          <h1
            style={{
              marginBottom'var(--spacing-lg)',
              maxWidth'800px',
              margin'0 auto var(--spacing-lg)',
              textAlign'center',
            }}
          >
            Receive Jesus
          </h1>

          {/* Subheading */}
          <h2
            style={{
              textAlign'center',
              marginBottom'var(--spacing-md)',
              maxWidth'800px',
              margin'0 auto var(--spacing-md)',
            }}
          >
            Daily counsel from Jesus
          </h2>

          {/* Byline */}
          <p
            style={{
              fontSize'var(--text-label)',
              fontWeight'var(--weight-semibold)',
              color'var(--text-secondary)',
              textAlign'center',
              marginBottom'var(--spacing-3xl)',
              maxWidth'700px',
              margin'0 auto var(--spacing-3xl)',
              letterSpacing'var(--tracking-loose)',
            }}
          >
            Shared by Brother Jimi
          </p>

          {/* Body Text */}
          <p
            style={{
              fontSize'var(--text-body)',
              lineHeight'var(--leading-relaxed)',
              color'var(--text-secondary)',
              textAlign'center',
              marginBottom'var(--spacing-4xl)',
              maxWidth'700px',
              margin'0 auto var(--spacing-4xl)',
            }}
          >
            Start discovering who you are in Him. A 90-day free mentorship journey with daily reflections on freedom, truth, and transformation in Christ.
          </p>

          {/* Email Signup Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              marginBottom'var(--spacing-5xl)',
              maxWidth'500px',
              margin'0 auto var(--spacing-5xl)',
            }}
          >
            <div
              style={{
                display'flex',
                gap'var(--spacing-lg)',
                flexDirection'column',
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex1,
                  padding`var(--spacing-lg) var(--spacing-xl)`,
                  border`1px solid var(--border-primary)`,
                  borderRadius'var(--radius-full)',
                  fontSize'var(--text-body)',
                  fontFamily'var(--font-sans)',
                  transition'border-color 200ms ease-in-out',
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--color-accent)')
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = 'var(--border-primary)')
                }
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  alignSelf'flex-start',
                }}
              >
                {submitted ? 'Check your email' 'Start Free'}
              </button>
            </div>
          </form>

          {submitted && (
            <p
              style={{
                textAlign'center',
                color'var(--text-secondary)',
                fontSize'var(--text-label)',
                maxWidth'700px',
                margin'0 auto',
              }}
            >
              ✓ Check your email to confirm. Your first reflection arrives tomorrow at 6am.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}
