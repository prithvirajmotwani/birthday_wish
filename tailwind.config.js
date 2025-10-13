/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          900: "#001f1a",
          800: "#013026",
          700: "#014034",
        },
        gold: "#b8860b",
        cream: "#f5e6cc",
        rose: "#ff6f91",
      },
      fontFamily: {
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        body: ['Poppins', 'Quicksand', 'sans-serif'],
      },
      boxShadow: {
        glow: "0 0 25px rgba(255, 111, 145, 0.45)",
        aurora: "0 0 35px rgba(184, 134, 11, 0.35)",
      },
      backgroundImage: {
        'card-gradient': "radial-gradient(circle at 10% 20%, rgba(255, 111, 145, 0.18), transparent 60%), radial-gradient(circle at 80% 30%, rgba(184, 134, 11, 0.15), transparent 55%)",
        'starfield': "linear-gradient(180deg, rgba(1, 64, 52, 0.96) 0%, rgba(1, 31, 26, 0.98) 100%)",
      },
      keyframes: {
        shimmer: {
          '0%,100%': { opacity: 0.3 },
          '50%': { opacity: 0.8 },
        },
        float: {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-12px) translateX(6px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        },
        bloom: {
          '0%': { transform: 'scale(0.4)', opacity: 0 },
          '60%': { transform: 'scale(1.05)', opacity: 0.9 },
          '100%': { transform: 'scale(1)', opacity: 0 },
        },
      },
      animation: {
        shimmer: 'shimmer 6s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        bloom: 'bloom 3s ease-in-out both',
      },
    },
  },
  plugins: [],
}

