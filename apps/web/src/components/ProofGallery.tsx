'use client';

import { motion } from 'framer-motion';

interface ProofItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  caption?: string;
}

interface ProofGalleryProps {
  items: ProofItem[];
  onVideoClick: (url: string) => void;
}

export default function ProofGallery({ items, onVideoClick }: ProofGalleryProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-rc-text/60 uppercase tracking-wide">
        Proof & Evidence
      </p>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => item.type === 'video' && onVideoClick(item.url)}
            className="relative aspect-square rounded-lg overflow-hidden bg-rc-text/5 border border-rc-border/20 hover:shadow-lg transition-all duration-300"
            disabled={item.type === 'image'}
          >
            <img
              src={item.url}
              alt={item.caption || 'Proof'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />

            {item.type === 'video' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-rc-text/20 to-rc-text/5 flex items-center justify-center">
                  <svg className="w-8 h-8 text-rc-text/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <svg className="w-5 h-5 text-rc-text ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            )}

            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1">
                <p className="text-xs text-white truncate">{item.caption}</p>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
