import {defineConfig} from 'astro/config';

// https://astro.build/config
export default defineConfig({site: 'https://justaos.com', compressHTML: false, server: {port: 4000, host: true}});
