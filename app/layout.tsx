import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { EditorProvider } from './editor/context/EditorContext';
import { ToastProvider } from './editor/contexts/ToastContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Winterfell',
  description: 'Your application description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EditorProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </EditorProvider>
      </body>
    </html>
  );
}
