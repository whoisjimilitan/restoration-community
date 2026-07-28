'use client';

import { useState } from 'react';

const testimonials = [
  {
    quote: 'I ran scams for 12 years. Jesus broke those chains.',
    name: 'David M.',
    detail: 'Fraud operations'
  },
  {
    quote: 'The shame was crushing. Forgiveness reached me. I\'m actually free.',
    name: 'Sarah K.',
    detail: 'Cryptocurrency scams'
  },
  {
    quote: 'I didn\'t believe God would have me. He did. I\'m standing now.',
    name: 'Marcus J.',
    detail: 'Fraud consultant'
  }
];

const faqs = [
  {
    question: 'Is this just psychology or therapy?',
    answer: 'No. This is spiritual deliverance grounded in Jesus Christ. Psychology can help with coping, but only the Holy Spirit can break spiritual bondage. We address the root, not just the symptom.'
  },
  {
    question: 'What if I\'ve done really terrible things?',
    answer: 'No one is beyond Jesus Christ\'s reach. The Gospel doesn\'t say "good people" or "people who haven\'t done much damage." It says "while we were still sinners." Forgiveness is available to everyone.'
  },
  {
    question: 'Will this be kept confidential?',
    answer: 'Yes. We operate under strict confidentiality. What you share on the form goes only to our team. We respect your privacy and trust completely.'
  },
  {
    question: 'How long does the process take?',
    answer: 'Deliverance happens in a day. The journey of restoration takes 7 days of guided truth-work. But real transformation—learning to live honestly—is a lifelong journey of following Jesus.'
  },
  {
    question: 'What if I\'m not religious?',
    answer: 'You don\'t need to be religious. You just need to be honest about where you are. Jesus meets you there. Many who come to us say they never believed until they experienced His deliverance firsthand.'
  },
  {
    question: 'Can I do this if I still have legal issues?',
    answer: 'Yes. Deliverance and restoration don\'t require a clean legal record. In fact, many people find that walking in truth helps them address legal consequences with integrity, which courts often recognize.'
  },
  {
    question: 'What happens after the 7 days?',
    answer: 'You enter our community of restored people. You continue learning to live honestly, build real relationships, do honest work, and serve others. You\'re never alone in this.'
  },
  {
    question: 'Is there a cost?',
    answer: 'No. Deliverance is free. We don\'t charge for prayer, counsel, or spiritual freedom. Our mission is restoration through Jesus Christ, not profit.'
  }
];

export default function DeliverancePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    contactNumber: '',
    duration: '',
    freedomFrom: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/deliverance-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === 'freedomFrom') {
      setCharCount(e.target.value.length);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-rc-bg flex flex-col justify-center py-24 md:py-32 px-6 sm:px-8 md:px-12">
        <div className="max-w-2xl mx-auto w-full">
          <div className="space-y-8">
            {/* Success Checkmark */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-rc-gold/20 flex items-center justify-center animate-scale-in">
                <svg className="w-8 h-8 text-rc-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
                Thank you.
              </h1>
            </div>

            <div className="space-y-6 text-lg text-rc-text leading-relaxed">
              <p>W<span className="italic">e</span> hav<span className="italic">e</span> r<span className="italic">e</span>c<span className="italic">e</span>iv<span className="italic">e</span>d your r<span className="italic">e</span>qu<span className="italic">e</span>st.</p>
              <p>W<span className="italic">e</span> will call you p<span className="italic">e</span>rsonally v<span className="italic">e</span>ry soon.</p>
            </div>

            <div className="space-y-6 text-lg text-rc-text-secondary leading-relaxed border-l-4 border-rc-gold pl-8 py-4">
              <p>W<span className="italic">e</span> will sp<span className="italic">e</span>ak with you.</p>
              <p>W<span className="italic">e</span> will list<span className="italic">e</span>n to you.</p>
              <p>W<span className="italic">e</span> will coun<span className="italic">e</span>l you.</p>
              <p>W<span className="italic">e</span> will h<span className="italic">e</span>lp you g<span className="italic">e</span>t r<span className="italic">e</span>ady.</p>
              <p>W<span className="italic">e</span> will arrang<span className="italic">e</span> a tim<span className="italic">e</span> for your d<span className="italic">e</span>liv<span className="italic">e</span>ranc<span className="italic">e</span>.</p>
              <p className="pt-4 border-t border-rc-text/10">
                Aft<span className="italic">e</span>r you ar<span className="italic">e</span> s<span className="italic">e</span>t fr<span className="italic">e</span><span className="italic">e</span> w<span className="italic">e</span> will walk with you through s<span className="italic">e</span>v<span className="italic">e</span>n days of truth. On<span className="italic">e</span> day at a tim<span className="italic">e</span>. To h<span className="italic">e</span>lp you stand firm in your n<span className="italic">e</span>w lif<span className="italic">e</span>.
              </p>
              <p>B<span className="italic">e</span> <span className="italic">e</span>ncourag<span className="italic">e</span>d. J<span className="italic">e</span>sus Christ is abl<span className="italic">e</span> to s<span className="italic">e</span>t you fr<span className="italic">e</span><span className="italic">e</span>.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* FORM SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8 mb-16">
            <div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
                R<span className="italic">e</span>qu<span className="italic">e</span>st D<span className="italic">e</span>liv<span className="italic">e</span>ranc<span className="italic">e</span>
              </h1>
            </div>

            <p className="text-lg text-rc-text-secondary leading-relaxed">
              T<span className="italic">e</span>ll us about yours<span className="italic">e</span>lf. W<span className="italic">e</span> will call you p<span className="italic">e</span>rsonally to discuss how w<span className="italic">e</span> can h<span className="italic">e</span>lp you walk toward fr<span className="italic">e</span>edom in J<span className="italic">e</span>sus Christ.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-rc-text mb-3">
                First Nam<span className="italic">e</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 sm:py-4 bg-white border-b-2 border-rc-border text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:border-rc-gold transition-colors duration-200"
                placeholder="Your first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-rc-text mb-3">
                Contact Numb<span className="italic">e</span>r
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 sm:py-4 bg-white border-b-2 border-rc-border text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:border-rc-gold transition-colors duration-200"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-rc-text mb-3">
                How long hav<span className="italic">e</span> you liv<span className="italic">e</span>d in this situation?
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 5 years, 10 months"
                required
                className="w-full px-4 py-3 sm:py-4 bg-white border-b-2 border-rc-border text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:border-rc-gold transition-colors duration-200"
              />
            </div>

            <div>
              <div className="flex items-end justify-between mb-3">
                <label className="block text-sm font-medium text-rc-text">
                  What is on<span className="italic">e</span> thing you want to b<span className="italic">e</span> fr<span className="italic">e</span><span className="italic">e</span> from most?
                </label>
                <span className="text-xs text-rc-text-tertiary">
                  {charCount}/500
                </span>
              </div>
              <textarea
                name="freedomFrom"
                value={formData.freedomFrom}
                onChange={handleChange}
                required
                maxLength={500}
                rows={6}
                className="w-full px-4 py-3 sm:py-4 bg-white border-b-2 border-rc-border text-rc-text placeholder-rc-text-tertiary focus:outline-none focus:border-rc-gold transition-colors duration-200 resize-none"
                placeholder="Tell us what burden weighs heaviest on your heart..."
              />
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 sm:py-4 min-h-[48px] sm:min-h-[48px] bg-rc-accent hover:bg-rc-accent-light text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-gold focus:ring-offset-2 focus:ring-offset-rc-bg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              >
                {loading ? 'Submitting...' : 'R<span className="italic">e</span>qu<span className="italic">e</span>st D<span className="italic">e</span>liv<span className="italic">e</span>ranc<span className="italic">e</span>'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-12">
          <div>
            <p className="text-sm font-medium text-rc-accent uppercase tracking-wide mb-2">R<span className="italic">e</span>al Stori<span className="italic">e</span>s</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
              P<span className="italic">e</span>opl<span className="italic">e</span> Lik<span className="italic">e</span> You
            </h2>
          </div>

          <div className="grid gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border-l-4 border-rc-gold pl-6 py-4 bg-white rounded-r"
              >
                <p className="text-lg text-rc-text italic mb-4 leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
                <p className="text-sm font-medium text-rc-text">
                  {testimonial.name}
                </p>
                <p className="text-xs text-rc-text-secondary">
                  {testimonial.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rc-text leading-tight">
            Qu<span className="italic">e</span>stions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="border-b border-rc-border pb-4 last:border-b-0 group"
              >
                <summary className="text-lg font-medium text-rc-text cursor-pointer py-2 flex items-center justify-between hover:text-rc-accent transition-colors">
                  {faq.question}
                  <span className="text-rc-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-rc-text-secondary leading-relaxed pt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 sm:px-8 md:px-12 bg-rc-text border-t border-rc-border">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-white/60 text-sm">
            R<span className="italic">e</span>storation Community — J<span className="italic">e</span>sus Christ D<span className="italic">e</span>liv<span className="italic">e</span>rs
          </p>
          <p className="text-white/40 text-xs">
            © 2026. All rights r<span className="italic">e</span>s<span className="italic">e</span>rv<span className="italic">e</span>d.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </div>
  );
}
