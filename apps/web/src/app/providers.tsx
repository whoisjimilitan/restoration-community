'use client';

import ModalProvider from '@/components/ModalProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      {children}
    </ModalProvider>
  );
}
