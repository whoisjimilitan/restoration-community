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

export default function AboutPage() {
  return (
    <div className="bg-rc-bg text-rc-text relative">
      <PageHero
        headline="About Brother Jimi"
        photo={{ src: '/images/portrait-warm-studio.jpg', alt: 'Brother Jimi' }}
      />

      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light"
        >
          <motion.p variants={fadeInLine}>Brother Jimi is a minister of the gospel of Jesus Christ.</motion.p>
          <motion.p variants={fadeInLine} className="pt-2">Born in Canada, raised in Nigeria, he was controlled by a spirit called Weje for twenty years.</motion.p>
          <motion.p variants={fadeInLine} className="pt-2">Through the ministry of Prophet T.B. Joshua, <span className="text-rc-accent">Jesus Christ delivered him from Weje in May 2015 and gave him a new heart</span>.</motion.p>
          <motion.p variants={fadeInLine} className="pt-2">Today he lives in Ghana with his wife and two sons, Josiah and Jeriah, ministering to young people across West Africa and beyond.</motion.p>
          <motion.p variants={fadeInLine} className="pt-4 font-medium text-rc-text">His message is clear: fraud is a spiritual problem and the solution is deliverance through Jesus Christ.</motion.p>
        </motion.div>
      </section>

      <section data-nav-mode="light" className="grain-overlay w-full py-16 md:py-20 px-6 sm:px-8 md:px-12 bg-rc-canvas border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-rc-bg font-rc-serif text-xl md:text-2xl font-medium leading-relaxed">
            The same Jesus who delivered me can deliver you.
          </p>
          <SiteButton variant="outline-light" href="/?prayer=1">I Need Jesus</SiteButton>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
