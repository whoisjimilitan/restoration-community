'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Reflection {
  id
  day
  title
  rawQuote
  versionA
  versionB
  versionC
  quotable
  scripture
}

export default function JourneyPage({ params }{ params{ day } }) {
  const [reflection, setReflection] = useState<Reflection | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dayNumber = parseInt(params.day, 10)

  useEffect(() => {
    const fetchReflection = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/notion/reflection?day=${dayNumber}`)
        if (!response.ok) throw new Error('Failed to fetch reflection')
        const data = await response.json()
        setReflection(data)
      } catch (err) {
        setError(err instanceof Error ? err.message 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchReflection()
  }, [dayNumber])

  if (loading) {
    return (
      <main className="bg-white">
        <section className="section">
          <div className="container-max text-center">
            <p className="text-slate">Loading reflection...</p>
          </div>
        </section>
      </main>
    )
  }

  if (error || !reflection) {
    return (
      <main className="bg-white">
        <section className="section">
          <div className="container-max text-center">
            <p className="text-slate mb-32">{error || 'Reflection not found'}</p>
            <Link href="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="bg-white">
      {/* Reflection Content */}
      <section className="section pt-80">
        <div className="container-max max-w-3xl mx-auto">
          <div className="mb-64">
            <div className="text-product-kicker text-accent font-sf-pro-display font-semibold mb-24">
              Day {reflection.day}
            </div>

            <h1 className="mb-48">{reflection.title}</h1>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-80">
            <div className="text-body leading-relaxed whitespace-pre-wrap text-ink mb-48">
              {reflection.versionC}
            </div>
          </div>

          {/* Quotable */}
          <div className="quotable">
            {reflection.quotable}
          </div>

          {/* Scripture */}
          <div className="scripture mb-80">
            <div className="scripture-ref">{reflection.scripture.split(' — ')[0]}</div>
            <p>{reflection.scripture.split(' — ')[1]}</p>
          </div>

          {/* Share Section */}
          <div className="section bg-studio-mist -mx-64 px-64 py-64 mb-80">
            <div className="container-max">
              <p className="text-feature-copy font-sf-pro-display font-semibold mb-32">
                Pass it along
              </p>

              <div className="flex gap-16 flex-wrap">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(reflection.quotable + ' — brotherjimi.com')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  WhatsApp
                </a>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${reflection.quotable}\n\nRead the full reflection at brotherjimi.com/journey/${dayNumber}`
                    )
                    alert('Link copied to clipboard')
                  }}
                  className="btn btn-secondary"
                >
                  Copy Link
                </button>

                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(reflection.quotable + '\n\nbrotherjimi.com')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {dayNumber > 1 ? (
              <Link href={`/journey/${dayNumber - 1}`} className="btn btn-secondary">
                ← Previous
              </Link>
            ) (
              <div />
            )}

            <Link href="/" className="text-slate hover:text-ink">
              Back to Home
            </Link>

            {dayNumber < 90 ? (
              <Link href={`/journey/${dayNumber + 1}`} className="btn btn-secondary">
                Next →
              </Link>
            ) (
              <div />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}