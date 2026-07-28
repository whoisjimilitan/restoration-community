'use client';

import { useState } from 'react';
import Link from 'next/link';

const testimonials = [
  {
    quote: 'I ran scams for 12 years. Jesus broke those chains.',
    name: 'David M.',
  },
  {
    quote: 'The shame was crushing. Forgiveness reached me. I\'m free.',
    name: 'Sarah K.',
  },
  {
    quote: 'I didn\'t believe God would have me. He did.',
    name: 'Marcus J.',
  }
];

const faqs = [
  {
    question: 'What happens after I create an account?',
    answer: 'A ministry leader will contact you within 24-48 hours to discuss your situation and the next step toward deliverance prayer.'
  },
  {
    question: 'Is my information kept confidential?',
    answer: 'Yes. Everything you share is kept strictly confidential. We respect your privacy and trust completely.'
  },
  {
    question: 'What if I\'ve done really terrible things?',
    answer: 'No one is beyond Jesus Christ\'s reach. The Gospel doesn\'t say "good people." It says "while we were still sinners." Forgiveness is available to everyone.'
  },
  {
    question: 'Do I need to be religious?',
    answer: 'No. You just need to be honest about where you are. Jesus meets you there. Many say they never believed until they experienced His deliverance firsthand.'
  },
  {
    question: 'What if I have legal issues?',
    answer: 'Deliverance doesn\'t require a clean record. Walking in truth often helps address legal consequences with integrity, which courts recognize.'
  },
  {
    question: 'Is there a cost?',
    answer: 'No. Deliverance is free. We don\'t charge for prayer, counsel, or spiritual freedom. Our mission is restoration through Jesus Christ.'
  }
];

const PASSWORD_MIN_LENGTH = 12;

export default function DeliverancePage() {
  const [showTestimonials, setShowTestimonials] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.password.length >= PASSWORD_MIN_LENGTH &&
    formData.password === formData.confirmPassword &&
    formData.contactNumber.trim() &&
    !error;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFormErrors({});

    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (formData.password.length < PASSWORD_MIN_LENGTH) {
      newErrors.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          password: formData.password,
          contactNumber: formData.contactNumber.trim()
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 409) {
          setError('An account already exists with this email address.');
        } else {
          setError(data.error || 'Registration failed');
        }
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-rc-bg flex flex-col justify-center py-24 md:py-32 px-6 sm:px-8 md:px-12">
        <div className="max-w-2xl mx-auto w-full">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight">
              Your First St<span className="italic">e</span>p Has B<span className="italic">e</span>en Tak<span className="italic">e</span>n
            </h1>

            <div className="space-y-6 text-lg text-rc-text leading-relaxed">
              <p>Thank you for op<span className="italic">e</span>ning your h<span className="italic">e</span>art.</p>
              <p>Your account has b<span className="italic">e</span>en cr<span className="italic">e</span>at<span className="italic">e</span>d. A ministry l<span className="italic">e</span>ad<span className="italic">e</span>r will r<span className="italic">e</span>ach out to you within 24-48 hours to discuss th<span className="italic">e</span> n<span className="italic">e</span>xt st<span className="italic">e</span>p toward pray<span className="italic">e</span>r and your <span className="italic">e</span>ncount<span className="italic">e</span>r with J<span className="italic">e</span>sus Christ.</p>
            </div>

            <div className="bg-rc-warm-gray p-8 rounded-lg space-y-4">
              <h2 className="text-2xl font-serif font-bold text-rc-text">
                What Happ<span className="italic">e</span>ns N<span className="italic">e</span>xt
              </h2>
              <p className="text-rc-text leading-relaxed">
                R<span className="italic">e</span>m<span className="italic">e</span>mb<span className="italic">e</span>r: your past do<span className="italic">e</span>s not hav<span className="italic">e</span> to d<span className="italic">e</span>fin<span className="italic">e</span> your futur<span className="italic">e</span>. Through J<span className="italic">e</span>sus Christ, a n<span className="italic">e</span>w lif<span className="italic">e</span> is possibl<span className="italic">e</span>.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 min-h-[48px] bg-rc-accent hover:bg-rc-accent-light text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-gold focus:ring-offset-2 focus:ring-offset-rc-bg"
            >
              R<span className="italic">e</span>turn Hom<span className="italic">e</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-rc-bg text-rc-text">
      {/* TESTIMONIALS - EXPANDABLE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-warm-gray border-b border-rc-border">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setShowTestimonials(!showTestimonials)}
            className="w-full text-left mb-8 flex items-center justify-between hover:text-rc-accent transition-colors"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-rc-text">
              P<span className="italic">e</span>opl<span className="italic">e</span> Lik<span className="italic">e</span> You
            </h2>
            <span className={`text-2xl text-rc-accent transition-transform ${showTestimonials ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {showTestimonials && (
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="border-l-4 border-rc-gold pl-6 py-4 bg-white rounded-r">
                  <p className="text-lg text-rc-text italic mb-3">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <p className="text-sm font-medium text-rc-text">
                    {testimonial.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ - EXPANDABLE */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-b border-rc-border">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="w-full text-left mb-8 flex items-center justify-between hover:text-rc-accent transition-colors"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-rc-text">
              Qu<span className="italic">e</span>stions
            </h2>
            <span className={`text-2xl text-rc-accent transition-transform ${showFAQ ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {showFAQ && (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="border-b border-rc-border pb-4 last:border-b-0 group">
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
          )}
        </div>
      </section>

      {/* ACCOUNT CREATION FORM */}
      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-rc-text leading-tight mb-8">
            G<span className="italic">e</span>t D<span className="italic">e</span>liv<span className="italic">e</span>r<span className="italic">e</span>d
          </h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-rc-text mb-2">
                  First Nam<span className="italic">e</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-b-2 bg-white text-rc-text placeholder-rc-text-tertiary focus:outline-none transition-colors ${
                    formErrors.firstName ? 'border-b-red-500 focus:border-b-red-500' : 'border-b-rc-border focus:border-b-rc-gold'
                  }`}
                  placeholder="Your first name"
                />
                {formErrors.firstName && <p className="text-red-600 text-sm mt-1">{formErrors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-rc-text mb-2">
                  Last Nam<span className="italic">e</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-b-2 bg-white text-rc-text placeholder-rc-text-tertiary focus:outline-none transition-colors ${
                    formErrors.lastName ? 'border-b-red-500 focus:border-b-red-500' : 'border-b-rc-border focus:border-b-rc-gold'
                  }`}
                  placeholder="Your last name"
                />
                {formErrors.lastName && <p className="text-red-600 text-sm mt-1">{formErrors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-rc-text mb-2">
                <span className="italic">E</span>mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-b-2 bg-white text-rc-text placeholder-rc-text-tertiary focus:outline-none transition-colors ${
                  formErrors.email ? 'border-b-red-500 focus:border-b-red-500' : 'border-b-rc-border focus:border-b-rc-gold'
                }`}
                placeholder="your@email.com"
              />
              {formErrors.email && <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-rc-text mb-2">
                Contact Numb<span className="italic">e</span>r
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-b-2 bg-white text-rc-text placeholder-rc-text-tertiary focus:outline-none transition-colors ${
                  formErrors.contactNumber ? 'border-b-red-500 focus:border-b-red-500' : 'border-b-rc-border focus:border-b-rc-gold'
                }`}
                placeholder="+1 (555) 000-0000"
              />
              {formErrors.contactNumber && <p className="text-red-600 text-sm mt-1">{formErrors.contactNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-rc-text mb-2">
                Passw<span className="italic">o</span>rd (min {PASSWORD_MIN_LENGTH} characters)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-b-2 bg-white text-rc-text placeholder-rc-text-tertiary focus:outline-none transition-colors ${
                  formErrors.password ? 'border-b-red-500 focus:border-b-red-500' : 'border-b-rc-border focus:border-b-rc-gold'
                }`}
                placeholder="Enter a strong password"
              />
              {formErrors.password && <p className="text-red-600 text-sm mt-1">{formErrors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-rc-text mb-2">
                Confirm Passw<span className="italic">o</span>rd
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-b-2 bg-white text-rc-text placeholder-rc-text-tertiary focus:outline-none transition-colors ${
                  formErrors.confirmPassword ? 'border-b-red-500 focus:border-b-red-500' : 'border-b-rc-border focus:border-b-rc-gold'
                }`}
                placeholder="Confirm your password"
              />
              {formErrors.confirmPassword && <p className="text-red-600 text-sm mt-1">{formErrors.confirmPassword}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full px-8 py-4 min-h-[48px] bg-rc-accent hover:bg-rc-accent-light text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rc-gold focus:ring-offset-2 focus:ring-offset-rc-bg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              >
                {loading ? 'Creating Account...' : 'G<span className="italic">e</span>t D<span className="italic">e</span>liv<span className="italic">e</span>r<span className="italic">e</span>d'}
              </button>
            </div>
          </form>
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
    </div>
  );
}
