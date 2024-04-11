/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ea8271",
        primary2: "#c26c8a",
        secondary: "#52A0D2",
        secondary2: "#2979A7",
        white: "#fafafa",
        lightgrey: "#e5e5e5",
        grey: "#c4c4c4",
        black: "#2d2d2d",
      },
      screens: {
        "2xs": "375px",
        xs: "430px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
