'use client';

export default function HonestWorkSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-rc-bg border-t border-rc-border">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 md:px-16 lg:px-12">
        <div className="space-y-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-rc-text leading-tight tracking-tight">
              A Life Restored
            </h2>
          </div>

          <div className="space-y-8 md:space-y-10 text-lg md:text-xl text-rc-text leading-relaxed font-light">
            <p>
              The Holy Spirit restores every part of life. Deliverance is the beginning.
            </p>

            <p>
              The Holy Spirit teaches us a new way to live. How we work. How we serve. How we love. How we live with integrity.
            </p>

            <p className="text-lg md:text-xl text-rc-accent font-serif font-bold">
              This is restoration. This is new life in Christ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
