'use client';

import { motion } from 'framer-motion';

interface VideoHeroProps {
  imageUrl: string;
  imageAlt: string;
  onPlayClick: () => void;
}

export default function VideoHero({ imageUrl, imageAlt, onPlayClick }: VideoHeroProps) {
  return (
    <section className="w-screen -mx-[calc(50vw-50%)] bg-gradient-to-br from-[#0F0F0F] to-[#1a1a1a]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.15 }}
        className="w-full relative aspect-video md:aspect-auto md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Hero Image */}
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>

        {/* Play Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={onPlayClick}
          className="relative z-20 group flex items-center justify-center"
          aria-label="Watch Samuel's 41-minute confession"
        >
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:shadow-xl hover:bg-white/95 cursor-pointer transition-all duration-300">
            <svg className="w-10 h-10 text-[#0F0F0F] ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}
