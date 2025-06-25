import type { Config } from 'tailwindcss';

import sharedConfig from '@repo/ui/tailwind.config';

const config = {
  darkMode: ['class'],
  presets: [sharedConfig],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
} satisfies Config;

export default config;
