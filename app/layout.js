
import './globals.css';
import {Urbanist, Plus_Jakarta_Sans, DM_Sans, Manrope, Rubik } from 'next/font/google';
import ClientOnlyWrapper from './providers/ClientOnlyWrapper';
// import ClientProvider from './providers/ClientProvider';
// import { ToastContainer } from 'react-toastify';
// import { Toaster } from 'react-hot-toast';

// Load fonts
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const rubik = Rubik({ subsets: ['latin'], variable: '--font-rubik' });


const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-urbanist',
  display: 'swap',
});

export const metadata = {
  title: 'Sj-mart',
  description: 'Best E-commerce UI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${dmSans.variable} ${manrope.variable} ${rubik.variable}`}>
      <body className="font-inter">
        <ClientOnlyWrapper>
          {children}
        </ClientOnlyWrapper>
          
         
      </body>
    </html>
  );
}
