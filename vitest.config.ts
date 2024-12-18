import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './__tests__/setup.ts',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    env: {
      NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: 'test_project_id',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
}) 