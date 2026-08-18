import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mario Sianturi Portfolio',
    short_name: 'Mario Portfolio',
    description: 'Software Engineer and Full-Stack Web Developer portfolio of Togar Anthony Mario Sianturi.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0F',
    theme_color: '#0A0A0F',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
