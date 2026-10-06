import { useState } from 'react'

export default function Partner() {
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState(25)
  const [customAmount, setCustomAmount] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const displayAmount = showCustom ? (parseInt(customAmount) || 0) : amount

  const handleAmountClick = (value) => {
    if (value === 'custom') {
      setShowCustom(true)
      setAmount(null)
    } else {
      setShowCustom(false)
      setAmount(value)
    }
    setMessage('')
    setError(false)
  }

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError(false)

    if (!displayAmount || displayAmount < 1) {
      setMessage('Enter $1 or more.')
      setError(true)
      return
    }

    if (!email.trim()) {
      setMessage('Enter an email address.')
      setError(true)
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount: displayAmount * 100, // Convert to cents
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.message || 'Checkout failed')
        setError(true)
        setLoading(false)
        return
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setMessage('Network error. Please try again.')
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Minimal Header */}
      <div style={{ borderBottom: '1px solid #e5e5e7', padding: '16px 0' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 16px' }}>
          <a href="/" style={{ fontSize: '15px', fontWeight: 600, textDecoration: 'none', color: '#1d1d1f' }}>
            Brother Jimi
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '692px', margin: '0 auto', padding: '100px 16px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8b2332', marginBottom: '8px' }}>
          Partner
        </p>

        <h1 style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '16px' }}>
          Keep it free for everyone.
        </h1>

        <p style={{ fontSize: '19px', color: '#6e6e73', lineHeight: 1.42, maxWidth: '560px', marginBottom: '48px' }}>
          Partners help these letters reach someone new each morning. Pray, share, or give. Each one matters.
        </p>

        {/* Partner Form */}
        <form onSubmit={handleSubmit} noValidate style={{ marginBottom: '48px' }}>
          {/* Amount Buttons */}
          <div style={{ marginBottom: '32px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[10, 25, 50, 100].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleAmountClick(value)}
                aria-pressed={!showCustom && amount === value}
                style={{
                  padding: '12px 20px',
                  border: !showCustom && amount === value ? '2px solid #1d1d1f' : '1px solid #d2d2d7',
                  background: !showCustom && amount === value ? '#1d1d1f' : '#ffffff',
                  color: !showCustom && amount === value ? '#ffffff' : '#1d1d1f',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                ${value}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleAmountClick('custom')}
              aria-pressed={showCustom}
              style={{
                padding: '12px 20px',
                border: showCustom ? '2px solid #1d1d1f' : '1px solid #d2d2d7',
                background: showCustom ? '#1d1d1f' : '#ffffff',
                color: showCustom ? '#ffffff' : '#1d1d1f',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Other
            </button>
          </div>

          {/* Custom Amount Input */}
          {showCustom && (
            <div style={{ marginBottom: '32px' }}>
              <label htmlFor="custom-amt" style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>
                Monthly amount in dollars
              </label>
              <input
                id="custom-amt"
                type="number"
                min="1"
                inputMode="numeric"
                placeholder="Amount per month, in dollars"
                value={customAmount}
                onChange={handleCustomChange}
                autoFocus
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d2d2d7',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          )}

          {/* Email Input */}
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 500 }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d2d2d7',
                borderRadius: '6px',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Status Message */}
          {message && (
            <p style={{ fontSize: '14px', color: error ? '#ff3b30' : '#34c759', marginBottom: '16px', fontWeight: 500 }}>
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: '#8b2332',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'opacity 0.2s',
              marginBottom: '12px',
            }}
          >
            {loading ? 'Processing...' : `Give $${displayAmount} a month`}
          </button>

          {/* Fine print */}
          <p style={{ fontSize: '12px', color: '#6e6e73', textAlign: 'center', marginBottom: '24px' }}>
            Secure checkout by Stripe. Change or cancel anytime.
          </p>
        </form>

        {/* Alternative CTA */}
        <p style={{ fontSize: '16px', color: '#1d1d1f', lineHeight: 1.5 }}>
          Can't give right now? Pray for this work, or{' '}
          <a href="/today" style={{ color: '#8b2332', textDecoration: 'none' }}>
            send today's counsel
          </a>{' '}
          to one person.
        </p>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e5e5e7', padding: '40px 16px', marginTop: '80px' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '12px', color: '#6e6e73', margin: 0 }}>
            © 2026 Brother Jimi · Your email is used only for the daily letters. Never sold or shared.
          </p>
          <nav style={{ display: 'flex', gap: '24px', margin: 0 }}>
            <a href="/today" style={{ fontSize: '12px', color: '#1d1d1f', textDecoration: 'none' }}>
              Today's Counsel
            </a>
            <a href="/start" style={{ fontSize: '12px', color: '#1d1d1f', textDecoration: 'none' }}>
              Start Here
            </a>
            <a href="/privacy" style={{ fontSize: '12px', color: '#1d1d1f', textDecoration: 'none' }}>
              Privacy
            </a>
            <a href="/contact" style={{ fontSize: '12px', color: '#1d1d1f', textDecoration: 'none' }}>
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}