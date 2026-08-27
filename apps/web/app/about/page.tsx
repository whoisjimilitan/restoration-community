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
        photo={{ src: '/images/portrait-hero-website.jpg', alt: 'Brother Jimi' }}
      />

      <section className="w-full py-24 md:py-32 px-6 sm:px-8 md:px-12 bg-rc-bg border-t border-rc-border">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="max-w-2xl mx-auto space-y-4 text-base md:text-lg text-rc-text/80 leading-relaxed font-light"
        >
          <motion.p variants={fadeInLine}>Brother Jimi (J-I-M-I) is a minister of the gospel of Jesus Christ.</motion.p>
          <motion.p variants={fadeInLine} className="pt-2">Born in Canada, raised in Nigeria, he was controlled by a spirit called Weje for twenty years.</motion.p>
          <motion.p variants={fadeInLine} className="pt-2">Through the grace of God and the ministry of Prophet T.B. Joshua, he was delivered in May 2015 and received a new heart.</motion.p>
          <motion.p variants={fadeInLine} className="pt-2">Today he lives in Ghana with his wife and two sons, Josiah and Jeriah, ministering to young people across West Africa and beyond.</motion.p>
          <motion.p variants={fadeInLine} className="pt-4 font-medium text-rc-text">His message is clear: fraud is a spiritual problem and the solution is deliverance through Jesus Christ.</motion.p>
          <motion.p variants={fadeInLine}>He is your brother, your friend, and your son in the Lord.</motion.p>
        </motion.div>
      </section>

      <section className="w-full py-16 md:py-20 px-6 sm:px-8 md:px-12 bg-gradient-to-br from-rc-accent to-rc-text border-t border-rc-border text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-white font-rc-serif text-xl md:text-2xl font-medium leading-relaxed">
            Make me your prayer partner. And together we will stop Satan in his tracks.
          </p>
          <SiteButton variant="outline-light" href="/get-help">I Need Help</SiteButton>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
