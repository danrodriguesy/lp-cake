import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import https from 'https';
import {defineConfig} from 'vite';

// Automatically download elegant serif font to act as PP Mondwest locally
const publicDir = path.resolve(__dirname, 'public');
const fontPath = path.resolve(publicDir, 'PPMondwest-Regular.woff2');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

if (!fs.existsSync(fontPath)) {
  console.log('--- Downloading PP Mondwest-Regular font fallback (Playfair Display) ---');
  const fontUrl = 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_53EsWD30Hs.woff2';
  https.get(fontUrl, (response) => {
    const fileStream = fs.createWriteStream(fontPath);
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('--- Font downloaded and saved to public/PPMondwest-Regular.woff2 ---');
    });
  }).on('error', (error) => {
    console.error('Error downloading font:', error);
  });
}


export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
