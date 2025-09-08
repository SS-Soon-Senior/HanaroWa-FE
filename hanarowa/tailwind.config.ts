import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      hana: ['var(--font-hana)', 'sans-serif'],
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;
