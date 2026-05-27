import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        checkout: resolve(__dirname, 'checkout.html'),
        orders: resolve(__dirname, 'orders.html'),
        tracking: resolve(__dirname, 'tracking-page.html'),
      },
    },
  },
})