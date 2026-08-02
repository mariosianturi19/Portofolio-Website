// file: app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter_Tight, JetBrains_Mono, Syne } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { Toaster } from '@/components/ui/toaster';

const interTight = Inter_Tight({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-display', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-mono', display: 'swap' });
const siteUrl = 'https://mariosianturi.vercel.app';
const siteTitle = 'Togar Anthony Mario Sianturi — Frontend & Full-Stack Developer';
const siteDescription = 'Portfolio of Togar Anthony Mario Sianturi, a Computer Engineering graduate and Frontend / Full-Stack Developer experienced with React, Next.js, TypeScript, and Node.js.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Mario Sianturi Portfolio',
  title: {
    default: siteTitle,
    template: '%s | Mario Sianturi',
  },
  description: siteDescription,
  keywords: ['Mario Sianturi', 'Frontend Developer', 'Full-Stack Developer', 'IT Developer', 'Next.js', 'React', 'TypeScript', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Togar Anthony Mario Sianturi' }],
  creator: 'Togar Anthony Mario Sianturi',
  publisher: 'Togar Anthony Mario Sianturi',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A0A0F' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0F' },
  ],
  colorScheme: 'dark',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Mario Sianturi Portfolio',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/opengraph-image/',
        width: 1200,
        height: 630,
        alt: 'Mario Sianturi — Frontend and Full-Stack Developer portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/opengraph-image/'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${interTight.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans selection:bg-primary selection:text-primary-foreground`}>

        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <LanguageProvider>
            <SmoothScrollProvider>
              <Preloader />
              <CustomCursor />
              <ScrollProgress />
              <BackToTop />
              <Navbar />
              <main id="main-content" role="main" aria-label="Main content">
                {children}
              </main>
              <Toaster />
            </SmoothScrollProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
