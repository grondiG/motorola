/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fade_from_bottom_keyframes: {
          from: {
            opacity: 0,
            transform: "translateY(100%)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        }
      },
      animation: {
        'fade-from-bottom': "fade_from_bottom_keyframes 0.3s ease-in-out",
      }
    },
  },
  plugins: [
    require('tailwindcss-animation')
  ],
}
