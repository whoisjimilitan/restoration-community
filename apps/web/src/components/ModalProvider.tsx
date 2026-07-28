'use client';

import { useState, useEffect } from 'react';
import DeliveranceLeadModal from './DeliveranceLeadModal';

export default function ModalProvider() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    document.addEventListener('open-deliverance-modal', handleOpen);
    document.addEventListener('close-deliverance-modal', handleClose);

    return () => {
      document.removeEventListener('open-deliverance-modal', handleOpen);
      document.removeEventListener('close-deliverance-modal', handleClose);
    };
  }, []);

  if (!isOpen) return null;

  return <DeliveranceLeadModal onClose={() => setIsOpen(false)} />;
}
