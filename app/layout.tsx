import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import SmoothScrollProvider from '@/components/SmoothScrollProvider'; // Import provider baru kita

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Togar Anthony Mario Sianturi - Portfolio',
  description: 'Portfolio website of Togar Anthony Mario Sianturi, a Front-End Developer and Mobile App Creator.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
            {/* Bungkus seluruh konten utama dengan SmoothScrollProvider */}
            <SmoothScrollProvider>
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