'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function PartnerPage() {
  const [amount, setAmount] = useState('30')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to Stripe
    setSubmitted(true)
  }

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="section pt-80">
        <div className="container-max max-w-3xl mx-auto text-center">
          <h1 className="mb-48">Partner Monthly</h1>

          <p className="text-body text-slate leading-relaxed mb-64">
            If these reflections have transformed your life, you can invest monthly to help others find Jesus. No pressure—you get full access to all 90 days regardless.
          </p>
        </div>
      </section>

      {/* Section Gap */}
      <div className="h-80" />

      {/* Partnership Form */}
      <section className="section bg-studio-mist">
        <div className="container-max max-w-2xl mx-auto">
          <div className="card">
            <h2 className="text-feature-heading font-serif font-semibold mb-48">
              Choose Your Support
            </h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-48">
                <div>
                  <label className="block text-product-kicker font-semibold mb-24 text-ink">
                    Monthly Amount
                  </label>

                  <div className="grid grid-cols-3 gap-16 mb-32">
                    {['10', '25', '50', '100'].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAmount(val)}
                        className={`py-16 px-24 rounded-lg border-2 font-semibold transition-all ${
                          amount === val
                            ? 'border-accent bg-accent text-white'
                            : 'border-control-gray text-ink hover:border-accent'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>

                  <div className="mb-32">
                    <label className="block text-sm text-slate mb-12">
                      Or enter custom amount
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-24 py-16 border border-control-gray rounded-lg text-body focus:outline-none focus:border-accent"
                      placeholder="Enter amount in USD"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-product-kicker font-semibold mb-24 text-ink">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-24 py-16 border border-control-gray rounded-lg text-body placeholder-steel focus:outline-none focus:border-accent"
                    placeholder="your@email.com"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Continue to Payment
                </button>

                <p className="text-center text-xs text-slate">
                  Secure payment powered by Stripe. Billing renews monthly.
                </p>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-body text-slate mb-32">
                  ✓ Thank you. You'll receive a payment link via email.
                </p>
                <p className="text-sm text-slate mb-48">
                  Your partnership starts immediately. Expect an email within 2 minutes.
                </p>
                <Link href="/" className="btn btn-primary">
                  Back to Home
                </Link>
              </div>
            )}
          </div>

          {/* Assurance */}
          <div className="mt-64 text-center">
            <p className="text-slate text-sm leading-relaxed max-w-xl mx-auto">
              Still want Days 31–90 free? Yes. Partnership isn't payment for access—it's investment in reaching others with Jesus. All reflections remain free forever.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="section">
        <div className="container-max text-center">
          <Link href="/" className="text-slate hover:text-ink">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  )
}