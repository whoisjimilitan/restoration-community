'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to Substack API
    setSubmitted(true)
    setEmail('')
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="hero">
        <div className="container-max">
          {/* Image: Hands holding Bible with verse */}
          <div className="mb-80 w-full max-w-2xl mx-auto aspect-square bg-gradient-to-b from-studio-mist to-paper-frost rounded-3xl flex flex-col items-center justify-center p-64 relative">
            {/* Hero image placeholder with verse overlay */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-ink/5 to-ink/10" />

            <div className="relative z-10 text-center">
              <div className="text-accent text-product-kicker font-sf-pro-display font-semibold mb-32">
                John 10:10
              </div>

              <p className="font-serif text-lg leading-relaxed text-ink mb-48 max-w-sm">
                "I have come that they may have life, and have it to the full."
              </p>

              <p className="text-sm text-slate">
                Hands holding Bible
              </p>
            </div>
          </div>

          <h1 className="mb-24 max-w-3xl mx-auto">
            Receive Jesus
          </h1>

          <h2 className="text-feature-heading font-serif font-semibold mb-16 max-w-2xl mx-auto">
            Daily counsel from Jesus
          </h2>

          <p className="text-product-kicker font-sf-pro-display font-semibold mb-48 text-slate max-w-2xl mx-auto">
            Shared by Brother Jimi
          </p>

          <p className="text-body text-slate mb-64 max-w-2xl mx-auto leading-relaxed">
            Start discovering who you are in Him. A 90-day free mentorship journey with daily reflections on freedom, truth, and transformation in Christ.
          </p>

          {/* Email Signup */}
          <form onSubmit={handleSubmit} className="mb-80 max-w-xl mx-auto">
            <div className="flex gap-16 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-24 py-16 border border-control-gray rounded-pill text-body placeholder-steel focus:outline-none focus:border-accent"
              />
              <button type="submit" className="btn btn-primary">
                {submitted ? 'Check your email' : 'Start Free'}
              </button>
            </div>
          </form>

          {submitted && (
            <p className="text-center text-slate text-sm max-w-2xl mx-auto">
              ✓ Check your email to confirm. Your first reflection arrives tomorrow at 6am.
            </p>
          )}
        </div>
      </section>

      {/* Section Gap */}
      <div className="h-128" />

      {/* Latest Reflection Preview */}
      <section className="section bg-studio-mist">
        <div className="container-max">
          <h2 className="mb-64">Today's Reflection</h2>

          <div className="card mb-48">
            <div className="text-product-kicker font-sf-pro-display font-semibold mb-24 text-accent">
              Day 1
            </div>

            <h3 className="text-feature-heading font-serif font-semibold mb-32">
              You're Not Weak
            </h3>

            <p className="text-body leading-relaxed mb-48 text-slate">
              A believer operating in the natural is no match for satan. Human strength doesn't come from our natural abilities.
            </p>

            <div className="quotable">
              "You're not weak. You're drawing from death instead of life."
            </div>

            <div className="scripture">
              <div className="scripture-ref">Romans 8:5-6</div>
              <p>"Those who live according to the flesh have their minds set on what the flesh desires; but those who live in accordance with the Spirit have their minds set on what the Spirit desires. The mind governed by the flesh is death, but the mind governed by the Spirit is life and peace."</p>
            </div>

            <Link href="/journey/1" className="btn btn-primary inline-block mt-48">
              Read Full Reflection
            </Link>
          </div>
        </div>
      </section>

      {/* Section Gap */}
      <div className="h-128" />

      {/* Previous Reflections */}
      <section className="section">
        <div className="container-max">
          <h2 className="mb-64">All Reflections</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-48">
            {[
              { day: 1, title: "You're Not Weak", date: "Oct 4" },
              { day: 2, title: "You're Not Trapped", date: "Oct 5" },
              { day: 3, title: "Your Words Build Your Tomorrow", date: "Oct 6" },
            ].map((reflection) => (
              <Link
                key={reflection.day}
                href={`/journey/${reflection.day}`}
                className="card hover:shadow-subtle transition-shadow"
              >
                <div className="text-global-nav text-slate font-semibold mb-12">
                  Day {reflection.day}
                </div>
                <h3 className="text-feature-heading font-serif font-semibold mb-16 leading-tight">
                  {reflection.title}
                </h3>
                <p className="text-slate text-sm">{reflection.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section bg-studio-mist border-t border-hairline-silver">
        <div className="container-max text-center">
          <p className="text-slate text-sm mb-32">
            © 2026 Brother Jimi. All reflections center on Jesus Christ.
          </p>
          <p className="text-steel text-xs">
            Free mentorship Days 1–90. No payment required.
          </p>
        </div>
      </footer>
    </main>
  )
}
