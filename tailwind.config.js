/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-bg': '#f5f5f5',
        'message-bg': '#ffffff',
        'primary': '#2563eb',
        'secondary': '#64748b',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [],
}