module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      header: "IBM Plex Sans Arabic",
      base: "Fira Sans",
    },
    extend: {
      padding: {
        mobile: "5%",
        desktop: "15%",
      },
      colors: {
        primary: "#FF8000",
        secondary: "#B66CF1",
        tertiary: "#6CD1F1",
        primaryBackground: "#34312E",
        secondaryBackground: "#403C38",
        primaryText: "#f3f3f3",
      },
      dropShadow: {
        basic: "0 0 4px rgba(0, 0, 0, .25)",
        error: "0 0 4px rgb(220, 38, 38)",
      },
    },
  },
  plugins: [],
};
