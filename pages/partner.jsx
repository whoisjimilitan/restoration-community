import { useState } from 'react'

export default function Partner() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          amount: 10, // $10/month in cents: 1000
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Checkout failed')
        setLoading(false)
        return
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #e5e5e7', padding: '16px' }}>
        <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 16px' }}>
          <a href="/" style={{ fontSize: '15px', fontWeight: 600, textDecoration: 'none', color: '#1d1d1f' }}>
            Brother Jimi
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '692px', margin: '0 auto', padding: '100px 16px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '24px', lineHeight: 1.1 }}>
          Support This Work
        </h1>

        <p style={{ fontSize: '19px', color: '#6e6e73', marginBottom: '48px', lineHeight: 1.5 }}>
          These letters take time to write, refine, and share. If this work means something to you, you can support it here. No pressure. Never gatekeeping.
        </p>

        {/* Partnership Tiers */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '32px' }}>Three Ways to Partner</h2>

          <div style={{ display: 'grid', gap: '24px' }}>
            {/* Pray */}
            <div style={{ padding: '24px', border: '1px solid #e5e5e7', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Pray</h3>
              <p style={{ color: '#6e6e73', lineHeight: 1.5 }}>
                The most powerful thing. Pray for this work, for the readers, for breakthrough.
              </p>
            </div>

            {/* Share */}
            <div style={{ padding: '24px', border: '1px solid #e5e5e7', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Share</h3>
              <p style={{ color: '#6e6e73', lineHeight: 1.5 }}>
                Send a letter to someone you think needs it. One person reaching one person changes everything.
              </p>
            </div>

            {/* Give */}
            <div style={{ padding: '24px', border: '1px solid #8b2332', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px' }}>Give</h3>
              <p style={{ color: '#6e6e73', lineHeight: 1.5 }}>
                Monthly support. $10/month. Directly funds more time to write, think, and pray.
              </p>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div style={{ padding: '40px', background: '#f5f5f7', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Monthly Support</h2>

          <form onSubmit={handleCheckout}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
                Email
              </label>
              <input
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

            {error && (
              <div style={{ padding: '12px', background: '#fff', border: '1px solid #ff3b30', borderRadius: '6px', color: '#ff3b30', marginBottom: '16px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: loading ? '#d2d2d7' : '#8b2332',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => !loading && (e.target.style.background = '#9c2a3b')}
              onMouseLeave={(e) => !loading && (e.target.style.background = '#8b2332')}
            >
              {loading ? 'Processing...' : 'Continue to Payment ($10/month)'}
            </button>

            <p style={{ fontSize: '12px', color: '#6e6e73', marginTop: '16px', textAlign: 'center' }}>
              Powered by Stripe. Secure & encrypted.
            </p>
          </form>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #e5e5e7', fontSize: '14px', color: '#6e6e73' }}>
          <p>Questions? <a href="mailto:whoisjimi.today@gmail.com" style={{ color: '#8b2332', textDecoration: 'none' }}>Email us</a></p>
        </div>
      </div>
    </div>
  )
}