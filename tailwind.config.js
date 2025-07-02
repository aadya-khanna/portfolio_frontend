// tailwind.config.js
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FEFAE0',
          dark: '#111111',
        },
        foreground: {
          DEFAULT: '#111111',
          dark: '#FEFAE0',
        },
        accent: '#EE9CB0',
        highlight: {
          DEFAULT: '#779BE7',
          dark: '#A8C3F0',
        },
      },
      fontFamily: {
        gambetta: ['Gambetta', 'serif'],
        plein: ['Plein', 'sans-serif'],
      },
    
    },
  },
  plugins: [],
};
