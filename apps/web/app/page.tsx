'use client';

import { useRef, useState } from 'react';
import { motion, cubicBezier } from 'framer-motion';

// Base64 avatar data URI (center-cropped square, 320x320, JPEG quality 85)

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const fadeInLine = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) } },
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
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
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
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img
          src="/images/brother-jimi-profile.jpg"
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

          {/* Current time */}
          <span className="flex-shrink-0 text-xs font-medium" style={{ color: '#8A8A80' }}>
            {formatTime(currentTime)}
          </span>
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" onLoadedMetadata={handleLoadedMetadata} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded}>
        <source src="/audio/brother-jimi-word.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default function BroJimiPage() {
  return (
    <>
      <style>{`nav { display: none !important; }`}</style>
      <div className="w-full relative overflow-hidden bg-rc-canvas text-white min-h-screen flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 grain-overlay">
      {/* Breathing radial glow */}
      <div
        className="absolute -top-[15%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none animate-[jm-breathe_14s_ease-in-out_infinite] z-0"
        style={{
          width: 'min(800px, 90vw)',
          height: 'min(800px, 90vw)',
          background: 'radial-gradient(circle, rgba(27,122,108,0.55) 0%, rgba(20,87,75,0.28) 38%, rgba(10,52,45,0) 68%)',
        }}
      />

      {/* Content — clean spine */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full relative z-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-16 sm:space-y-20 md:space-y-24"
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
          Every day, believers gather.
          <br />
          Every Friday, his story.
        </motion.h1>

        {/* Audio player — message card */}
        <motion.div variants={fadeInLine} className="w-full flex justify-center">
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
