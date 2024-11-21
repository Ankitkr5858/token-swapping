/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // => @media (min-width: 640px) { ... }
      sm: "576px",
      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1200px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: "#f67f20",
        hover_primary: "#FADDC7",
        secondary: "#0C2D57",
        disabled: "#AFAFAF",
        lightdisable: "#ebeaea",
        success: "#0BDA51",
      },
    },

    plugins: [],
  },
};
