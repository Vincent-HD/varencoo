import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart({ customViteReactPlugin: true }),
    viteReact(),
  ],
})
