import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'love-primary': '#FF6B6B',    // Warm red for primary actions
        'love-secondary': '#FFA5A5',   // Lighter red for secondary elements
        'love-accent': '#FF8FB1',      // Pink accent
        'love-light': '#FFE5E5',       // Very light pink for backgrounds
        'love-dark': '#4A4A4A',        // Dark gray for text
      },
      fontFamily: {
        sans: ['var(--font-inter)'],   // We'll use Inter font
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config