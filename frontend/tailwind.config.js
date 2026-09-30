/** Colors are CSS variables (see src/index.css) so light/dark share one set of class names. */
const c = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: c('base'),
        card: c('card'),
        panel: c('panel'),
        hover: c('hover'),
        line: c('line'),
        'line-strong': c('line-strong'),
        fg: c('fg'),
        'fg-2': c('fg-2'),
        'fg-3': c('fg-3'),
        forge: { DEFAULT: c('forge'), hover: c('forge-hover') },
        'on-forge': c('on-forge'),
        'hl-str': c('hl-str'),
        'hl-num': c('hl-num'),
        'hl-fn': c('hl-fn'),
      },
      keyframes: { blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } } },
      animation: { blink: 'blink 1s infinite' },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
};
