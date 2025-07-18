import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eternal Memories - Honor Lives, Preserve Memories',
  description: 'Create beautiful obituaries and celebrate the lives of those we love most. A compassionate platform for honoring memories and connecting with community.',
  keywords: 'obituary, memorial, tribute, celebration of life, funeral, remembrance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}