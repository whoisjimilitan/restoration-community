'use client';

import { useEffect } from 'react';

export default function AutoOpenDeliveranceModal({ delayMs = 1200 }: { delayMs?: number }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.dispatchEvent(new CustomEvent('open-deliverance-modal'));
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  return null;
}
