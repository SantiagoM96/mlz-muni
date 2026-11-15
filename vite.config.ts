import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  base: mode === 'pages' ? '/mlz-muni/' : '/',
  plugins: [react(), tailwindcss()],
  // La versión visible del UI Kit corresponde exactamente al commit compilado en Pages.
  define: {
    'import.meta.env.VITE_MLZ_COMMIT_SHA': JSON.stringify(process.env.GITHUB_SHA ?? 'local'),
    'import.meta.env.VITE_MLZ_BUILD_TIME': JSON.stringify(new Date().toISOString()),
  },
}));

