'use client';

import { motion, type Variants } from 'framer-motion';
import PageHero from '@/components/PageHero';
import SiteFooter from '@/components/SiteFooter';
import SiteButton from '@/components/SiteButton';

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeInLine: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const SCRIPTURES = [
  {
    ref: 'Jeremiah 17:11',
    verse: 'Like a partridge that hatches eggs it did not lay, are those who gain riches by unjust means. When their lives are half gone, their riches will desert them, and in the end they will prove to be fools.',
    explanation: 'This scripture describes my entire life in the fraud. Gain without substance. Work without reward. Rising and falling until Jesus set me free.',
  },
  {
    ref: '1 Thessalonians 4:6',
    verse: 'And that in this matter no one should wrong or take advantage of a brother or sister. The Lord will punish all those who commit such sins.',
    explanation: 'This is the warning. Fraud is not a victimless act. The Lord sees and the Lord judges.',
    repeatWarning: true,
  },
  {
    ref: 'Ezekiel 36:26',
    verse: 'I will give you a new heart and put a new spirit in you. I will remove from you your heart of stone and give you a heart of flesh.',
    explanation: 'In May 2015, this scripture became my life. The Lord Jesus Christ removed my heart of stone and gave me a new heart. What He did for me, He can do for you.',
    showGetHelp: true,
  },
];

export default function ScripturesPage() {
  return (
    <div className="bg-rc-bg text-rc-text relative">
      <PageHero headline="Scriptures That Shaped My Story" />

      {SCRIPTURES.map((s, i) => (
        <section
          key={s.ref}
          className={`w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 border-t border-rc-border ${i % 2 === 0 ? 'bg-rc-bg' : 'bg-rc-warm-gray'}`}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto space-y-8"
          >
            <motion.h2 variants={fadeInLine} className="text-3xl md:text-4xl font-rc-serif font-bold text-rc-accent leading-tight tracking-tight">
              {s.ref}
            </motion.h2>
            <motion.blockquote variants={fadeInLine} className="border-l-4 border-rc-accent pl-6 md:pl-8">
              <p className="text-lg md:text-xl text-rc-text font-rc-serif font-normal leading-relaxed">
                {s.verse}
              </p>
            </motion.blockquote>
            <motion.p variants={fadeInLine} className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
              {s.explanation}
            </motion.p>
            {s.repeatWarning && (
              <motion.p variants={fadeInLine} className="text-xl md:text-2xl font-rc-serif font-bold text-rc-accent pt-2">Take this as a warning.</motion.p>
            )}
            {s.showGetHelp && (
              <motion.div variants={fadeInLine} className="space-y-4">
                <p className="text-base md:text-lg text-rc-text/80 leading-relaxed font-light">
                  He can do it for you too.
                </p>
                <SiteButton href="/get-help">Get Help</SiteButton>
              </motion.div>
            )}
          </motion.div>
        </section>
      ))}

      <SiteFooter />
    </div>
  );
}
