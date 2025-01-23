"use client";

import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import '../globals.css';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider>
          <Navbar />
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
