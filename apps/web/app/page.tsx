'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Base64 avatar data URI (center-cropped square, 320x320, JPEG quality 85)
const AVATAR_SRC = 'data:image/jpeg;base64,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';

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const fadeInLine = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Audio player component — styled as a Telegram voice message
function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    if (!time || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div
      className="w-full max-w-lg rounded-2xl p-4 flex items-center gap-clamp backdrop-blur-sm"
      style={{
        backgroundColor: 'rgba(235, 231, 224, 0.88)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        gap: 'clamp(12px, 2.6vw, 18px)',
      }}
    >
      {/* Avatar container — circular clipping */}
      <div
        className="flex-shrink-0"
        style={{
          width: 'clamp(52px, 9vw, 68px)',
          height: 'clamp(52px, 9vw, 68px)',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img
          src={AVATAR_SRC}
          alt="Portrait of Brother Jimi"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'grayscale(18%) sepia(6%) contrast(1.04) brightness(.97)',
          }}
        />
      </div>

      {/* Message content — right side, vertically stacked */}
      <div className="flex-1 min-w-0 flex flex-col gap-0">
        {/* Label */}
        <p className="text-sm font-medium" style={{ color: '#1A1A18' }}>
          A word from Brother Jimi
        </p>

        {/* Controls — play button, progress, duration all in a row */}
        <div className="flex items-center gap-2">
          {/* Play button */}
          <button
            onClick={togglePlay}
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105"
            style={{ backgroundColor: '#C9925A' }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 20 20" fill="#1A1A18">
                <rect x="4" y="3" width="3" height="14" rx="1" />
                <rect x="13" y="3" width="3" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 20 20" fill="#1A1A18">
                <polygon points="5,2 18,11 5,20" />
              </svg>
            )}
          </button>

          {/* Progress bar */}
          <div
            role="progressbar"
            aria-label="Audio playback progress"
            aria-valuenow={Math.round((currentTime / duration) * 100) || 0}
            aria-valuemin={0}
            aria-valuemax={100}
            className="flex-1 h-1 rounded-full relative cursor-pointer"
            style={{ backgroundColor: 'rgba(26, 26, 24, 0.15)' }}
            onClick={(e) => {
              if (audioRef.current && duration > 0) {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                audioRef.current.currentTime = percent * duration;
              }
            }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                backgroundColor: '#1A1A18',
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
              }}
            />
          </div>

          {/* Duration */}
          <span className="flex-shrink-0 text-xs font-medium" style={{ color: '#8A8A80' }}>
            {formatTime(duration > 0 ? duration : 18)}
          </span>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}>
        <source src="/audio/brother-jimi-word.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default function BroJimiPage() {
  return (
    <>
      <style>{`nav { display: none !important; }`}</style>
      <div className="relative bg-rc-canvas text-white min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 grain-overlay">
      {/* Breathing radial glow */}
      <div
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none animate-[jm-breathe_14s_ease-in-out_infinite] z-0"
        style={{
          width: 'min(800px, 100vw)',
          height: 'min(800px, 100vw)',
          background: 'radial-gradient(circle, rgba(27,122,108,0.55) 0%, rgba(20,87,75,0.28) 38%, rgba(10,52,45,0) 68%)',
        }}
      />

      {/* Content — clean spine */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl space-y-20 md:space-y-24"
      >
        {/* Mark line */}
        <motion.p
          variants={fadeInLine}
          className="text-xs uppercase tracking-[0.2em] font-medium"
          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
        >
          Brother Jimi | A Product of God's Grace
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeInLine}
          className="font-rc-serif font-bold text-3xl sm:text-4xl md:text-5xl leading-relaxed text-white"
          style={{ letterSpacing: '-0.025em' }}
        >
          Every day, prayer.
          <br />
          Every Friday, his story.
        </motion.h1>

        {/* Audio player — message card */}
        <motion.div variants={fadeInLine} className="w-full">
          <AudioPlayer />
        </motion.div>

        {/* CTA Button */}
        <motion.a
          variants={fadeInLine}
          href="https://t.me/BrotherJimiMinistry"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex font-bold rounded-full transition-all duration-200 px-10 py-4 text-base"
          style={{
            backgroundColor: '#C9925A',
            color: '#1A1A18',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#B89446';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#C9925A';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Enter on Telegram
        </motion.a>
      </motion.div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes breathe {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.82;
            transform: scale(1.06);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
      </div>
    </>
  );
}
