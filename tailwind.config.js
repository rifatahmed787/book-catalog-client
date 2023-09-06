/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        anton: ["Anton", "sans-serif"],
      },
      backgroundImage: {
        "box-pattern": "url('@/assets/images/loginPattern.svg')",
        "gradient-backdrop":
          "linear-gradient(to top right, #36393C, #141727, #141727, #141727, #141727, #141727)",
        "image-gradient": "bg-gradient-to-b from-yellow-400 to-green-400",
      },
      colors: {
        primary: "#0AB3A3",
        secondary: "#00D1CD",
        regular: "#ffffff",
        dark: "#0F172A",
      },
    },
  },

  plugins: [
    // eslint-disable-next-line no-undef
    require("flowbite/plugin"),
  ],
};
