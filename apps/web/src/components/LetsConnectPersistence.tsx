'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const WIDGET_ID = '9GBWhxT8KsCsuVDzXge3';

type PathAdvice = {
  embedWidget?: (widgetId: string) => void;
};

/**
 * Re-embeds the Let's Connect widget after Next.js client-side route changes.
 * The widget expects a traditional full-page navigation lifecycle; App
 * Router transitions don't reload the page, so without this it can vanish
 * after the first navigation instead of staying present on every page.
 */
export default function LetsConnectPersistence() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const w = window as unknown as { pathadvice?: PathAdvice };
    w.pathadvice?.embedWidget?.(WIDGET_ID);
  }, [pathname]);

  return null;
}
