import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native-web/dist/apis/StyleSheet/registry': fileURLToPath(new URL('./src/shims/styleRegistry.js', import.meta.url)),
      'react-bits/es/modules/Touchable.js': fileURLToPath(new URL('./src/shims/react-bits/Touchable.js', import.meta.url)),
      'react-bits/es/modules/Touchable': fileURLToPath(new URL('./src/shims/react-bits/Touchable.js', import.meta.url))
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
})
