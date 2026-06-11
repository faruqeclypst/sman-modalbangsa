import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SMAN Modal Bangsa',
    short_name: 'Mosa',
    description: 'Website Resmi SMA Negeri Modal Bangsa Aceh',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#166534',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
