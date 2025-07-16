'use client';

import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import ClientProvider from '../providers/ClientProvider';

export default function ClientOnlyWrapper({ children }) {
  return (
    <ClientProvider>
      <Toaster position="top-right" />
      <ToastContainer position="top-right" autoClose={3000} />
      {children}
    </ClientProvider>
  );
}
