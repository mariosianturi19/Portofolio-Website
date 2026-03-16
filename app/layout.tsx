// file: app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import Preloader from '@/components/Preloader'; // Preloader tetap dipertahankan

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Togar Anthony Mario Sianturi - Portfolio',
  description: 'Portfolio website of Togar Anthony Mario Sianturi, a Web Developer and Mobile App Creator.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Class 'cursor-none' sudah dihapus, kursor kembali normal */}
      <body className={`${inter.className} selection:bg-primary/30 selection:text-primary`}>
        
        {/* Cinematic Film Grain Overlay (Tetap dipertahankan untuk kesan mewah) */}
        <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.03] dark:opacity-[0.04] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />

        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SmoothScrollProvider>
              
              <Preloader /> {/* Layar pembuka megah */}
              
              <ScrollProgress />
              <BackToTop />
              <Navbar />
              <main id="main-content" role="main" aria-label="Main content">
                {children}
              </main>
            </SmoothScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}