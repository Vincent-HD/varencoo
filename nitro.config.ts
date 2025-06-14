import { defineNitroConfig } from 'nitropack/config';
import { cloudflare } from 'unenv';
import nitroCloudflareBindings from 'nitro-cloudflare-dev';

// TODO: remove this (and nitropack package) once we can customise the nitro config in the vite tanstack start plugin
// @see https://github.com/TanStack/router/issues/4404
export default defineNitroConfig({
    preset: 'cloudflare-module',
    unenv: cloudflare,
    // enables access to the Cloudflare runtime bindings like R2, D1, and other Cloudflare services in the development server.
    modules: [nitroCloudflareBindings],
})