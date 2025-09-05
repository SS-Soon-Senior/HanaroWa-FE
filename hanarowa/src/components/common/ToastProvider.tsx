'use client';

import { Toaster } from 'sonner';

const ToastProvider = () => {
  return (
    <Toaster
      richColors
      position='top-center'
      toastOptions={{
        duration: 2000,
        style: {
          fontSize: '1.8rem',
          padding: '1.2rem 2rem',
        },
        className: 'font-medium-24 text-[2rem]',
      }}
    />
  );
};

export default ToastProvider;
