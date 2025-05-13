/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#d3ad7f",
        blackk: "#13131a",
        bg: "#010103",
        darkgray: "1a1f25",
        lightgray: "#272c35",
        lightmainn: "#D3BC99",
        darkmainn: "#B5946D",
        toodark: "#7D664B",
      },
    },
  },
  plugins: [],
}