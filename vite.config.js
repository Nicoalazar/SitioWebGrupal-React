import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Lee .env y .env.local. El '' carga también variables sin el prefijo VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    // Sin DEV_HOST, Vite queda en localhost (su valor por defecto)
    server: { host: env.DEV_HOST || undefined },
  };
});
