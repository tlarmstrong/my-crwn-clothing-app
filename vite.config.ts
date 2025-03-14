import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://stackoverflow.com/questions/70309561/unable-to-import-svg-with-vite-as-reactcomponent
import svgr from '@svgr/rollup';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js', 
    clearMocks: true
  }
} as UserConfig)
