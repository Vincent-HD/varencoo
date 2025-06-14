import { defineConfig } from 'vite'
import { cloudflare } from 'unenv'
import nitroCloudflareBindings from 'nitro-cloudflare-dev'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart()
  ],
})
